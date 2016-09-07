package com.edo.zscb.service.impl;

import java.io.BufferedReader;
import java.io.Console;
import java.io.InputStreamReader;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.edo.bigd.constant.APIConstant;
import com.edo.zscb.model.vo.BigDAccount;
import com.edo.zscb.service.BigDService;

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
            String[] command = { "curl", "--url", url, "-k", "--data", data.toString(), "-H", "Content-type: application/json", "-c", "~/bigdcookie" };
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
            result = (BigDAccount)JSONObject.toBean(data, BigDAccount.class);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

}
