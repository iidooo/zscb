package com.edo.wescr.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;

import com.edo.wescr.constant.WescrConstant;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;

public class WescrAPIUtil {
    public static void main(String[] args) throws Exception {
        String key = WescrAPIUtil.randChar(10);
        String prikey = WescrAPIUtil.publicEnc(key, WescrConstant.WESCR_SECRET_KEY);
        Map<String, String> Objparameters = new HashMap<String, String>();
        Objparameters.put("userId", WescrConstant.WESCR_LOGIN_ID);// 用户名
        Objparameters.put("secretKey", prikey);
        Objparameters.put("userPwd", WescrAPIUtil.getEncString(WescrConstant.WESCR_LOGIN_PASSWORD, key));// 密码
        Objparameters.put("name", WescrAPIUtil.getEncString("岳嗣洪", key));// 参数
        Objparameters.put("card", WescrAPIUtil.getEncString("452426198103102737", key));// 参数
        System.out.println(execute(WescrConstant.WESCR_GET_PERSONAL_HOUSE_MATE, Objparameters));// 方法名
    }

    public static String execute(String method, Map<String, String> Objparameters) throws Exception {
        String strUrl = WescrConstant.WESCR_API_URL + method;// 测试环境

        PostMethod postMethod = null;
        HttpClient httpClient = new HttpClient();
        // 设置超时时间
        httpClient.getHttpConnectionManager().getParams().setConnectionTimeout(30000);
        httpClient.getHttpConnectionManager().getParams().setSoTimeout(30000);
        postMethod = new PostMethod(strUrl);
        int i = 0;
        NameValuePair[] nvps = new NameValuePair[Objparameters.size()];
        for (String strKey : Objparameters.keySet()) {
            NameValuePair nvp = new NameValuePair();
            nvp.setName(strKey);
            nvp.setValue(Objparameters.get(strKey));
            nvps[i] = nvp;
            i++;
        }
        postMethod.setRequestBody(nvps);
        httpClient.executeMethod(postMethod);
        String resultStr = postMethod.getResponseBodyAsString();
        System.out.println(resultStr);
        return resultStr.toString();
    }

    /**
     * 加密以String明文输入,String密文输出
     * 
     * @param strContent 待加密字符串
     * @param strKey 加密用的Key
     * @return 加密后转换为base64格式字符串
     */
    public static String getEncString(String strContent, String strKey) {
        String strMi = "";

        try {

            SecretKey secretKey = getKey(strKey);
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");// 创建密码器
            byte[] byteContent = strContent.getBytes("utf-8");
            cipher.init(Cipher.ENCRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(byteContent);

            strMi = Base64.encode(result);

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
        } catch (BadPaddingException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return strMi; // 加密
    }

    /**
     * @param strKey 密钥
     * @return 安全密钥
     * 
     *         指定具体产生key的算法，跨操作系统产生 SecretKey，如果不指定，各种操作系统产生的安全key不一致。
     */
    public static SecretKey getKey(String strKey) {
        try {
            KeyGenerator _generator = KeyGenerator.getInstance("AES");
            SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
            secureRandom.setSeed(strKey.getBytes());
            _generator.init(128, secureRandom);
            return _generator.generateKey();
        } catch (Exception e) {
            throw new RuntimeException("初始化密钥出现异常");
        }
    }

    /**
     * @param charCount 字符串数量
     * @return 键盘上字符产生数量为charCount的随机字符串
     */
    public static String randChar(int charCount) {
        String charValue = "";
        // 生成随机字母串
        for (int i = 0; i < charCount; i++) {
            // 键盘上字符产生随机数
            char c = (char) (randomInt(33, 128));
            charValue += String.valueOf(c);
        }
        return charValue;
    }

    /**
     * 返回[from,to)之间的一个随机整数
     * 
     * @param from 起始值
     * @param to 结束值
     * @return [from,to)之间的一个随机整数
     */
    public static int randomInt(int from, int to) {
        // Random r = new Random();
        return from + new Random().nextInt(to - from);
    }

    /**
     * RSA公钥加密明文
     * 
     * @param content 待加密明文
     * @return 密文
     */
    public static String publicEnc(String content, String pk) {
        try {
            KeyFactory keyf = KeyFactory.getInstance("RSA");
            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            PublicKey pubkey = null;
            InputStream is = new ByteArrayInputStream(pk.getBytes("utf-8"));

            byte[] pubbytes = new byte[new Long(pk.length()).intValue()];
            is.read(pubbytes);

            X509EncodedKeySpec pubX509 = new X509EncodedKeySpec(Base64.decode(new String(pubbytes)));

            pubkey = keyf.generatePublic(pubX509);
            cipher.init(Cipher.ENCRYPT_MODE, pubkey);
            byte[] cipherText = cipher.doFinal(content.getBytes());
            // 转换为Base64编码存储，以便于internet传送
            return Base64.encode(cipherText);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

}
