package com.edo.zscb.service.impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.edo.bigd.constant.APIConstant;
import com.edo.zscb.model.vo.BigDAccount;
import com.edo.zscb.model.vo.BigDOrder;
import com.edo.zscb.model.vo.BigDOrderList;
import com.edo.zscb.model.vo.SearchCondition;
import com.edo.zscb.service.BigDService;
import com.iidooo.core.util.DateUtil;

@Service
public class BigDServiceImpl implements BigDService {

    private static final Logger logger = Logger.getLogger(BigDServiceImpl.class);

    @Override
    public BigDAccount getAccount() {
        BigDAccount result = null;
        try {
            JSONObject data = new JSONObject();
            data.put("identification", APIConstant.BIGD_LOGIN_ID);
            data.put("password", APIConstant.BIGD_LOGIN_PASSWORD);

            String url = APIConstant.BIGD_API_URL + APIConstant.BIGD_API_LOGIN;
            String[] command = { "curl", "--url", url, "-k", "--data", data.toString(), "-H", "Content-type: application/json", "-c",
                    APIConstant.BIGD_COOKIE_PATH };
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
            result = (BigDAccount) JSONObject.toBean(data, BigDAccount.class);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public BigDOrderList getOrderList(String page, String perPage, String startTime, String endTime) {
        BigDOrderList result = null;
        try {
            JSONObject data = new JSONObject();
            data.put("page", page);
            data.put("per_page", perPage);
            data.put("start_complete_time", startTime);
            data.put("end_complete_time", endTime);

            String url = APIConstant.BIGD_API_URL + APIConstant.BIGD_API_ORDER + "?page=1&per_page=100";
//            "--data", data.toString(), "-H", "Content-type: application/json", 
            String[] command = { "curl", "--url", url, "-k", "-b", APIConstant.BIGD_COOKIE_PATH };
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
            result = new BigDOrderList(data);
            // result = (BigDOrderList) JSONObject.toBean(data, BigDOrderList.class);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public BigDOrder getOrder(Integer id) {
        BigDOrder result = null;
        try {
            String url = APIConstant.BIGD_API_URL + APIConstant.BIGD_API_ORDER_EXPORT + id.toString();
            String[] command = { "curl", "--url", url, "-k", "-H", "Content-type: application/json", "-b", APIConstant.BIGD_COOKIE_PATH };
            ProcessBuilder process = new ProcessBuilder(command);
            Process p;
            p = process.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }
            JSONObject data = JSONObject.fromObject(builder.toString());
            result = new BigDOrder(data);
            System.out.println(data);
            // result = (BigDOrderList) JSONObject.toBean(data, BigDOrderList.class);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public BigDOrder createOrder(SearchCondition condition) {
        BigDOrder result = null;
        try {
            JSONObject data = new JSONObject();
            data.put("name", "order_" + DateUtil.getNow(DateUtil.DATE_TIME_FULL_SIMPLE));
            data.put("remark", "order_" + DateUtil.getNow(DateUtil.DATE_TIME_FULL_SIMPLE));

            JSONArray searchFields = new JSONArray();
            // 添加要查询的字段
            searchFields.add(condition.getField());
            

            JSONArray searchParams = new JSONArray();
            JSONObject searchParamSelf = new JSONObject();
            searchParamSelf.put("telephone", condition.getTelephone());
            searchParamSelf.put("id_number", condition.getIdNumber());
            searchParamSelf.put("name", condition.getName());
            searchParams.add(searchParamSelf);

            data.put("search_fields", searchFields);
            data.put("search_params", searchParams);

            String url = APIConstant.BIGD_API_URL + APIConstant.BIGD_API_NEW_ORDER_SIMPLE;
            String[] command = { "curl", "--url", url, "-k", "--data", data.toString(), "-H", "Content-type: application/json", "-b",
                    APIConstant.BIGD_COOKIE_PATH };
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
            result = new BigDOrder(data);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

}
