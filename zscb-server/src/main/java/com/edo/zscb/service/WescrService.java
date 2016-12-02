package com.edo.zscb.service;


public interface WescrService {
     String getPersonBadInfo(String name, String idNumber);
     
     String getPersonalHouseMate(String name, String idNumber);
     
     String getBlackListByIdentityCard(String name, String idNumber);
     
     String queryPersonalSocialInfo(String name, String idNumber, String mobile);
     
     String zcyBankCardPersonalInfo(String name, String idNumber, String mobile, String bankCardNo);
     
     
}
