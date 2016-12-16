package com.edo.wescr.constant;

public class WescrConstant {
    
    public static final String DATA_SOURCE = "wescr";
    
    // 访问API的用户名
    public static final String WESCR_LOGIN_ID = "zheshangyinhang";

    // 访问API的密码
    public static final String WESCR_LOGIN_PASSWORD = "12345678";

    // 请求的IP地址
    public static final String WESCR_API_URL = "http://139.196.188.7:18085/wescr_api";

    // RSA公钥加密明文
    public static final String WESCR_SECRET_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJfTvFrDo2H5pSvrm0ijCnciljtjCwKn+yj8i8HaFi3BYkiniipFJwJLzOTr5VxL74nUcqNsF1syjv7FfCfE18JNy65bH+6cHmitKYEKxIe4Qc9uZ2KEjTwqJmSR7ECLa/lGp7p1Ld24oiOz5FMQS+lt5HDKm1Wz1ONkuClO13yQIDAQAB";

    // 个人不良信息查询
    // 该接口主要是根据被查询人姓名、身份号查询个人不良信息查询的统计信息。
    public static final String WESCR_GET_PERSON_BAD_INFO = "/personalBadInfo/getPersonBadInfo";

    public static final String WESCR_GET_BLACK_LIST_BY_IDENTITY_CARD = "/blackList/getBlackListByIdentityCard";

    public static final String WESCR_GET_PERSONAL_HOUSE_MATE = "/person/getPersonalHouseMate";

    public static final String WESCR_QUERY_PERSONLAL_SOCIAL_INFO = "/queryPersonalSocialInfo";

    public static final String WESCR_ZCY_BANK_CARD_PERSONAL_INFO = "/zcyBankCardPersonalInfo";
}
