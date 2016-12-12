package com.edo.bigd;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import net.sf.json.JSONObject;

import com.edo.bigd.constant.BigDConstant;

public class TestOrder {
    public static void main(String[] args) throws Exception {
        JSONObject data = new JSONObject();
        data.put("page", "1");
        data.put("per_page", "10");
        
        String url = BigDConstant.BIGD_API_URL + BigDConstant.BIGD_API_ORDER;
        String[] command = { "curl", "--url", url, "-k","-b", "/Users/Ethan/cookie123" };
        ProcessBuilder process = new ProcessBuilder(command);
        Process p;
        try {
            p = process.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                builder.append(line);
                builder.append(System.getProperty("line.separator"));
            }
            String result = builder.toString();
            System.out.print(result);
        } catch (IOException e) {
            System.out.print("error");
            e.printStackTrace();
        }
    }
}
