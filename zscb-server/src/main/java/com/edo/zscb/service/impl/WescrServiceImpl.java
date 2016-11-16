package com.edo.zscb.service.impl;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.edo.wescr.constant.APIConstant;
import com.edo.zscb.service.WescrService;
import com.iidooo.core.util.HttpUtil;

@Service
public class WescrServiceImpl implements WescrService {
    private static final Logger logger = Logger.getLogger(WescrServiceImpl.class);

    @Override
    public String getPersonBadInfo(String name, String idNumber) {
        String result = null;
        try {
            JSONObject data = new JSONObject();
            data.put("userId", APIConstant.WESCR_LOGIN_ID);
            data.put("userPwd", APIConstant.WESCR_LOGIN_PASSWORD);
            data.put("secretKey", APIConstant.WESCR_SECRET_KEY);
            data.put("name", name);
            data.put("idNumber", idNumber);

            String url = APIConstant.WESCR_API_URL + APIConstant.WESCR_GET_PERSON_BAD_INFO;
            result = HttpUtil.doPost(url, data.toString());
            System.out.println(result);
//            String[] command = { "curl", "--url", url, "-k", "--data", data.toString(), "-H", "Content-type: application/json", "-c",
//                    APIConstant.BIGD_COOKIE_PATH };
//            ProcessBuilder process = new ProcessBuilder(command);
//            Process p;
//            p = process.start();
//            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
//            StringBuilder builder = new StringBuilder();
//            String line = null;
//            while ((line = reader.readLine()) != null) {
//                builder.append(line);
//            }
//            data = JSONObject.fromObject(builder.toString());
//            result = (BigDAccount) JSONObject.toBean(data, BigDAccount.class);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }
    
}
