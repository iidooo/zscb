package com.edo.bigd;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.util.Random;

import javax.net.ssl.HttpsURLConnection;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.edo.bigd.constant.BigDConstant;
import com.iidooo.core.util.DateUtil;

public class Test {

    public static void main(String[] args) throws Exception {
        Test.login();
        Test.idIsMatch();
    }

    private static void login() {
        JSONObject data = new JSONObject();
        data.put("identification", BigDConstant.BIGD_LOGIN_ID);
        data.put("password", BigDConstant.BIGD_LOGIN_PASSWORD);

        // String result = HttpUtil.doPost(APIConstant.API_URL + APIConstant.API_LOGIN, data.toString());
        // System.out.println(result);

        // URL realUrl = new URL(APIConstant.API_URL + APIConstant.API_LOGIN);
        // HttpsURLConnection connection = HttpsURLConnection.
        // HttpsURLConnection connection = new https
        // String result = sendPost(APIConstant.API_URL+ APIConstant.API_LOGIN, data.toString());
        //
        // System.out.println(result);
        // String[] cmds = {
        // "curl",
        // "-i",
        // "-w",
        // "状态%{http_code}；DNS时间%{time_namelookup}；" + "等待时间%{time_pretransfer}TCP 连接%{time_connect}；发出请求%{time_starttransfer}；"
        // + "总时间%{time_total}", "http://www.baidu.com" };
        // ProcessBuilder pb = new ProcessBuilder(cmds);
        // pb.redirectErrorStream(true);
        // Process p;
        // try {
        // p = pb.start();
        // BufferedReader br = null;
        // String line = null;
        //
        // br = new BufferedReader(new InputStreamReader(p.getInputStream()));
        // while ((line = br.readLine()) != null) {
        // System.out.println("\t" + line);
        // }
        // br.close();
        // } catch (IOException e) {
        // // TODO Auto-generated catch block
        // e.printStackTrace();
        // }

        // // 创建SSLContext对象，并使用我们指定的信任管理器初始化
        // TrustManager[] tm = { new MyX509TrustManager() };
        // SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
        //
        // sslContext.init(null, tm, new java.security.SecureRandom());
        //
        // // 从上述SSLContext对象中得到SSLSocketFactory对象
        // SSLSocketFactory ssf = sslContext.getSocketFactory();
        //
        // // 创建URL对象
        // URL myURL = new URL(APIConstant.API_URL + APIConstant.API_LOGIN);
        //
        // // 创建HttpsURLConnection对象，并设置其SSLSocketFactory对象
        // HttpsURLConnection httpsConn = (HttpsURLConnection) myURL.openConnection();
        // httpsConn.setSSLSocketFactory(ssf);
        //
        // // 取得该连接的输入流，以读取响应内容
        // InputStreamReader insr = new InputStreamReader(httpsConn.getInputStream());
        //
        // // 读取服务器的响应内容并显示
        // int respInt = insr.read();
        // while (respInt != -1) {
        // System.out.print((char) respInt);
        // respInt = insr.read();
        // }

        String username = BigDConstant.BIGD_LOGIN_ID;
        String password = BigDConstant.BIGD_LOGIN_PASSWORD;
        String url = BigDConstant.BIGD_API_URL + BigDConstant.BIGD_API_LOGIN;
        String[] command = { "curl", "--url", url, "-k", "--data", data.toString(), "-H", "Content-type: application/json", "-c", "~/cookie123" };
        ProcessBuilder process = new ProcessBuilder(command);
        Process p;
        try {
            p = process.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }
            data = JSONObject.fromObject(builder.toString());

//            System.out.print(data);
        } catch (IOException e) {
            System.out.print("error");
            e.printStackTrace();
        }
    }

    private static void idIsMatch() {
        try {

            JSONObject data = new JSONObject();
            data.put("name", "order_" + DateUtil.getNow(DateUtil.DATE_TIME_FULL_SIMPLE));
            data.put("remark", "order_" + DateUtil.getNow(DateUtil.DATE_TIME_FULL_SIMPLE));

            JSONArray searchFields = new JSONArray();
            // 添加要查询的字段
            searchFields.add("idn_is_match");

            JSONArray searchParams = new JSONArray();
            JSONObject searchParamSelf = new JSONObject();
            searchParamSelf.put("id_number", "31022919840724043X");
            searchParamSelf.put("name", "王轶贤");
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
            System.out.print(data);
        } catch (Exception e) {
            // TODO: handle exception
        }
    }

    /**
     * 代理IP
     */
    private String[] proxyArray = { "127.0.0.1:8787", "115.239.210.199:80", "149.255.255.242:80", "124.172.242.175:80", "117.59.217.243:80",
            "183.234.59.89:18186", "117.59.217.236:80", "183.224.1.56:80", "120.202.249.230:80", "125.46.100.198:9999", "112.65.19.122:8080",
            "202.96.172.234:808", "183.224.1.114:80", "183.224.1.113:80", "222.66.115.229:80" };

    /**
     * @方法名：getProxy
     * @描述：随机获取代理IP
     * @创建人：<a href=mailto: 529901956@qq.com>小姨子的姐夫</a>
     * @修改人：
     * @修改时间：2014年8月18日 上午9:23:36
     * @return
     * @返回值：String[]
     * @异常说明：
     */
    public String[] getProxy() {
        String[] strlist = null;
        int len = proxyArray.length - 1;
        int num = 0;
        if (0 < len) {
            num = new Random().nextInt(len);
        }
        String proxy = this.proxyArray[num];
        if (proxy != "") {
            strlist = proxy.split(":");
        }

        return strlist;
    }

    /**
     * @方法名：sendPost
     * @描述：向指定 URL 发送POST方法的请求
     * @创建人：<a href=mailto: 529901956@qq.com>小姨子的姐夫</a>
     * @修改人：
     * @修改时间：2014年8月18日 上午9:29:09
     * @param url 发送请求的 URL
     * @param param 请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return 所代表远程资源的响应结果
     * @throws Exception
     * @返回值：String
     * @异常说明：
     */
    public static String sendPost(String url, String param) throws Exception {
        PrintWriter out = null;
        BufferedReader in = null;
        String result = "";

        // String[] proxyList = this.getProxy();
        // if (null != proxyList) {
        // System.setProperty("http.proxySet", "true");
        // System.setProperty("http.proxyHost", proxyList[0]);
        // System.setProperty("http.proxyPort", proxyList[1]);
        // }
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            HttpsURLConnection conn = (HttpsURLConnection) realUrl.openConnection();
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数
            out.print(param);
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            // throw new MyException("发送 POST 请求出现异常！" + e);
            // System.out.println("发送 POST 请求出现异常！" + e);
            e.printStackTrace();
        }
        // 使用finally块来关闭输出流、输入流
        finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException ex) {
                // throw new MyException("发送 POST 请求出现异常！" + ex);
                ex.printStackTrace();
            }
        }

        return result;
    }

}
