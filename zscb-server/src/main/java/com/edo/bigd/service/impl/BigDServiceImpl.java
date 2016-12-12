package com.edo.bigd.service.impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edo.bigd.constant.BigDConstant;
import com.edo.bigd.service.BigDService;
import com.edo.wescr.constant.WescrConstant;
import com.edo.zscb.mapper.IdentityMapper;
import com.edo.zscb.model.po.Identity;
import com.iidooo.core.util.DateUtil;

@Service
public class BigDServiceImpl implements BigDService {
    private static final Logger logger = Logger.getLogger(BigDServiceImpl.class);

    @Autowired
    private IdentityMapper identityMapper;

    @Override
    public boolean login() {
        try {
            JSONObject data = new JSONObject();
            data.put("identification", BigDConstant.BIGD_LOGIN_ID);
            data.put("password", BigDConstant.BIGD_LOGIN_PASSWORD);

            String url = BigDConstant.BIGD_API_URL + BigDConstant.BIGD_API_LOGIN;
            String[] command = { "curl", "--url", url, "-k", "--data", data.toString(), "-H", "Content-type: application/json", "-c",
                    BigDConstant.BIGD_COOKIE_PATH };
            ProcessBuilder process = new ProcessBuilder(command);
            Process p;
            p = process.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }
            data = JSONObject.fromObject(builder.toString());
            System.out.println(data);
            if (!data.getString("username").isEmpty()) {
                return true;
            }
            return false;
        } catch (Exception e) {
            logger.fatal(e);
            return false;
        }
    }

    @Override
    public boolean checkIdentityMatch(Integer operatorID, String name, String idNumber) {
        try {
            JSONObject data = new JSONObject();
            data.put("name", "order_" + DateUtil.getNow(DateUtil.DATE_TIME_FULL_SIMPLE));
            data.put("remark", "order_" + DateUtil.getNow(DateUtil.DATE_TIME_FULL_SIMPLE));

            JSONArray searchFields = new JSONArray();
            // 添加要查询的字段
            searchFields.add("idn_is_match");

            JSONArray searchParams = new JSONArray();
            JSONObject searchParamSelf = new JSONObject();
            searchParamSelf.put("id_number", idNumber);
            searchParamSelf.put("name", name);
            searchParams.add(searchParamSelf);

            data.put("search_fields", searchFields);
            data.put("search_params", searchParams);

            String url = BigDConstant.BIGD_API_URL + BigDConstant.BIGD_API_NEW_ORDER_SIMPLE;
            String[] command = { "curl", "--url", url, "-k", "--data", data.toString(), "-H", "Content-type: application/json", "-b",
                    BigDConstant.BIGD_COOKIE_PATH };
            ProcessBuilder process = new ProcessBuilder(command);
            Process p;
            p = process.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }
            data = JSONObject.fromObject(builder.toString());
            System.out.println(data);
            
            JSONObject detail = data.getJSONObject("detail");
            JSONArray dataArray = detail.getJSONArray("data");
            for (Object object : dataArray) {
                JSONObject jsonObject = JSONObject.fromObject(object);
                JSONObject jsonResult = jsonObject.getJSONObject("result");
                if ("一致".equals(jsonResult.getString("idn_is_match"))) {
                    // 更新身份信息
                    Identity identity = identityMapper.selectByIDNumber(idNumber, BigDConstant.DATA_SOURCE);
                    identity.setIsMatch(true);
                    identity.setUpdateUserID(operatorID);
                    identityMapper.updateByPrimaryKey(identity);
                }
            }
            return true;
        } catch (Exception e) {
            logger.fatal(e);
            return false;
        }
    }

}
