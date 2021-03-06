package com.edo.wescr.service;

import com.edo.wescr.model.WescrResult;

public interface WescrService {
    WescrResult getPersonBadInfo(Integer operatorID, String name, String idNumber);
    
    WescrResult getPersonalHouseMate(Integer operatorID, String name, String idNumber);
    
    WescrResult getBlackListByIdentityCard(Integer operatorID, String name, String idNumber);
    
    WescrResult queryPersonalSocialInfo(Integer operatorID, String name, String idNumber, String mobile);
    
    WescrResult zcyBankCardPersonalInfo(Integer operatorID, String name, String idNumber, String mobile, String bankCardNo);
}
