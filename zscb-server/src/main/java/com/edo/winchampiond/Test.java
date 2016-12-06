package com.edo.winchampiond;

import java.net.URLEncoder;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;

public class Test {
    public static void main(String[] args) throws Exception {
        String name = URLEncoder.encode("王轶贤","UTF-8");
        String strUrl =
         "http://101.95.169.50:9985/Core3Zither/winchampiond5/perService/getPerDegreeInfo?channel=zscb&userName=zscbjk&certiCode=31022919840724043X&pname=" + name+"&sign=F8F1B0C9A7BC6AC86831BD89C3E2C47A";
         
        System.out.println(strUrl);
//         strUrl = new String(strUrl,"UTF-8"); 
         //        String strUrl = "http://101.95.169.50:9985/Core3Zither/winchampiond1/perService/getPerDegreeInfo";
//        Map<String, String> Objparameters = new HashMap<String, String>();
        // String key = Test.randChar(10);
        // String prikey = Test.publicEnc(key,
        // "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJfTvFrDo2H5pSvrm0ijCnciljtjCwKn+yj8i8HaFi3BYkiniipFJwJLzOTr5VxL74nUcqNsF1syjv7FfCfE18JNy65bH+6cHmitKYEKxIe4Qc9uZ2KEjTwqJmSR7ECLa/lGp7p1Ld24oiOz5FMQS+lt5HDKm1Wz1ONkuClO13yQIDAQAB");
//        Objparameters.put("channel", "zscb");// 用户名
//        Objparameters.put("userName", "zscbjk");
//        Objparameters.put("certiCode", "210711197302065634");// 密码
//        Objparameters.put("pname", "涂超");// 参数
//        Objparameters.put("sign", "F8F1B0C9A7BC6AC86831BD89C3E2C47A");// 参数
        PostMethod postMethod = null;
        HttpClient httpClient = new HttpClient();
        // 设置超时时间
        httpClient.getHttpConnectionManager().getParams().setConnectionTimeout(30000);
        httpClient.getHttpConnectionManager().getParams().setSoTimeout(30000);
        postMethod = new PostMethod(strUrl);
        int i = 0;
//        NameValuePair[] nvps = new NameValuePair[Objparameters.size()];
//        for (String strKey : Objparameters.keySet()) {
//            NameValuePair nvp = new NameValuePair();
//            nvp.setName(strKey);
//            nvp.setValue(Objparameters.get(strKey));
//            nvps[i] = nvp;
//            i++;
//        }
//        postMethod.setRequestBody(nvps);
        httpClient.executeMethod(postMethod);
        String resultStr = postMethod.getResponseBodyAsString();
        System.out.println(resultStr.toString());
    }
}
