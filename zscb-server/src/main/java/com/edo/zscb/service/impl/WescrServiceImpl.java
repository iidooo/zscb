package com.edo.zscb.service.impl;

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
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.edo.wescr.Test;
import com.edo.wescr.constant.APIConstant;
import com.edo.zscb.service.WescrService;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;

@Service
public class WescrServiceImpl implements WescrService {
    private static final Logger logger = Logger.getLogger(WescrServiceImpl.class);

    @Override
    public String getPersonBadInfo(String name, String idNumber) {
        String result = null;
        try {
            String strUrl = APIConstant.WESCR_API_URL + APIConstant.WESCR_GET_PERSON_BAD_INFO;// 测试环境
            Map<String, String> Objparameters = new HashMap<String, String>();
            String key = this.randChar(10);
            String prikey = this.publicEnc(key, APIConstant.WESCR_SECRET_KEY);
            Objparameters.put("userId", APIConstant.WESCR_LOGIN_ID);// 用户名
            Objparameters.put("secretKey", prikey);
            Objparameters.put("userPwd", this.getEncString(APIConstant.WESCR_LOGIN_PASSWORD, key));// 密码
            Objparameters.put("name", Test.getEncString(name, key));// 参数
            Objparameters.put("idNumber", Test.getEncString(idNumber, key));// 参数
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
            return resultStr;
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public String getPersonalHouseMate(String name, String idNumber) {
        String result = null;
        try {
            String strUrl = APIConstant.WESCR_API_URL + APIConstant.WESCR_GET_PERSONAL_HOUSE_MATE;// 测试环境
            Map<String, String> Objparameters = new HashMap<String, String>();
            String key = this.randChar(10);
            String prikey = this.publicEnc(key, APIConstant.WESCR_SECRET_KEY);
            Objparameters.put("userId", APIConstant.WESCR_LOGIN_ID);// 用户名
            Objparameters.put("secretKey", prikey);
            Objparameters.put("userPwd", this.getEncString(APIConstant.WESCR_LOGIN_PASSWORD, key));// 密码
            Objparameters.put("name", Test.getEncString(name, key));// 参数
            Objparameters.put("card", Test.getEncString(idNumber, key));// 参数
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
            return resultStr;
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public String getBlackListByIdentityCard(String name, String idNumber) {
        String result = null;
        try {
            String strUrl = APIConstant.WESCR_API_URL + APIConstant.WESCR_GET_BLACK_LIST_BY_IDENTITY_CARD;// 测试环境
            Map<String, String> Objparameters = new HashMap<String, String>();
            String key = this.randChar(10);
            String prikey = this.publicEnc(key, APIConstant.WESCR_SECRET_KEY);
            Objparameters.put("userId", APIConstant.WESCR_LOGIN_ID);// 用户名
            Objparameters.put("secretKey", prikey);
            Objparameters.put("userPwd", this.getEncString(APIConstant.WESCR_LOGIN_PASSWORD, key));// 密码
            Objparameters.put("name", Test.getEncString(name, key));// 参数
            Objparameters.put("idNumber", Test.getEncString(idNumber, key));// 参数
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
            return resultStr;
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }
    
    @Override
    public String queryPersonalSocialInfo(String name, String idNumber, String mobile) {
        String result = null;
        try {
            String strUrl = APIConstant.WESCR_API_URL + APIConstant.WESCR_QUERY_PERSONLAL_SOCIAL_INFO;// 测试环境
            Map<String, String> Objparameters = new HashMap<String, String>();
            String key = this.randChar(10);
            String prikey = this.publicEnc(key, APIConstant.WESCR_SECRET_KEY);
            Objparameters.put("userId", APIConstant.WESCR_LOGIN_ID);// 用户名
            Objparameters.put("secretKey", prikey);
            Objparameters.put("userPwd", this.getEncString(APIConstant.WESCR_LOGIN_PASSWORD, key));// 密码
            Objparameters.put("name", Test.getEncString(name, key));// 参数
            Objparameters.put("card", Test.getEncString(idNumber, key));// 参数
            Objparameters.put("mobile", Test.getEncString(mobile, key));// 参数
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
            return resultStr;
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    
    @Override
    public String zcyBankCardPersonalInfo(String name, String idNumber, String mobile, String bankCardNo) {
        String result = null;
        try {
            String strUrl = APIConstant.WESCR_API_URL + APIConstant.WESCR_ZCY_BANK_CARD_PERSONAL_INFO;// 测试环境
            Map<String, String> Objparameters = new HashMap<String, String>();
            String key = this.randChar(10);
            String prikey = this.publicEnc(key, APIConstant.WESCR_SECRET_KEY);
            Objparameters.put("userId", APIConstant.WESCR_LOGIN_ID);// 用户名
            Objparameters.put("secretKey", prikey);
            Objparameters.put("userPwd", this.getEncString(APIConstant.WESCR_LOGIN_PASSWORD, key));// 密码
            Objparameters.put("name", Test.getEncString(name, key));// 参数
            Objparameters.put("iDCardNo", Test.getEncString(idNumber, key));// 参数
            Objparameters.put("bankCardNo", Test.getEncString(bankCardNo, key));// 参数
            Objparameters.put("phoneNo", Test.getEncString(mobile, key));// 参数
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
            return resultStr;
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    /**
     * 加密以String明文输入,String密文输出
     * 
     * @param strContent 待加密字符串
     * @param strKey 加密用的Key
     * @return 加密后转换为base64格式字符串
     */
    private String getEncString(String strContent, String strKey) {
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
    private SecretKey getKey(String strKey) {
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
    private String randChar(int charCount) {
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
    private int randomInt(int from, int to) {
        // Random r = new Random();
        return from + new Random().nextInt(to - from);
    }

    /**
     * RSA公钥加密明文
     * 
     * @param content 待加密明文
     * @return 密文
     */
    private String publicEnc(String content, String pk) {
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
