package com.edo.wescr.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edo.wescr.constant.WescrConstant;
import com.edo.wescr.model.PersonBadInfo;
import com.edo.wescr.model.WescrResult;
import com.edo.wescr.service.WescrService;
import com.edo.wescr.util.WescrAPIUtil;
import com.edo.zscb.mapper.LegalBlackMapper;
import com.edo.zscb.model.po.LegalBlack;

@Service
public class WescrServiceImpl implements WescrService {
    private static final Logger logger = Logger.getLogger(WescrServiceImpl.class);

    @Autowired
    private LegalBlackMapper legalBlackMapper;

    @Override
    public WescrResult getPersonBadInfo(Integer operatorID, String name, String idNumber) {
        WescrResult result = new WescrResult();
        try {
            String key = WescrAPIUtil.randChar(10);
            String prikey = WescrAPIUtil.publicEnc(key, WescrConstant.WESCR_SECRET_KEY);
            Map<String, String> Objparameters = new HashMap<String, String>();
            Objparameters.put("userId", WescrConstant.WESCR_LOGIN_ID);// 用户名
            Objparameters.put("secretKey", prikey);
            Objparameters.put("userPwd", WescrAPIUtil.getEncString(WescrConstant.WESCR_LOGIN_PASSWORD, key));// 密码
            Objparameters.put("name", WescrAPIUtil.getEncString(name, key));// 参数
            Objparameters.put("idNumber", WescrAPIUtil.getEncString(idNumber, key));// 参数
            String jsonString = WescrAPIUtil.execute(WescrConstant.WESCR_GET_PERSON_BAD_INFO, Objparameters);// 方法名

            JSONObject json = JSONObject.fromObject(jsonString);
            String code = json.getString("CODE");
            if ("0".equals(code)) {
                result.setCode(code);
                result.setMessage(json.getString("MESSAGE"));
                PersonBadInfo personBadInfo = (PersonBadInfo) JSONObject.toBean(json.getJSONObject("data"), PersonBadInfo.class);
                result.setData(personBadInfo);
                
                LegalBlack legalBlack = new LegalBlack();
                legalBlack.setIdNumber(idNumber);
                legalBlack.setRecordTime(personBadInfo.getCrimetime().substring(0,19));
                legalBlack.setDetail(personBadInfo.getHethercrime());
                legalBlack.setDataSource(WescrConstant.DATA_SOURCE);

                LegalBlack existLegalBlack = legalBlackMapper.selectByIDNumber(idNumber);
                if (existLegalBlack == null) {
                    legalBlack.setCreateTime(new Date());
                    legalBlack.setCreateUserID(operatorID);
                    legalBlackMapper.insert(legalBlack);
                } else {
                    legalBlack.setBlackID(existLegalBlack.getBlackID());
                    legalBlack.setUpdateUserID(operatorID);
                    legalBlackMapper.updateByPrimaryKey(legalBlack);
                }
            }
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public WescrResult getPersonalHouseMate(String name, String idNumber) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public WescrResult getBlackListByIdentityCard(String name, String idNumber) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public WescrResult queryPersonalSocialInfo(String name, String idNumber, String mobile) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public WescrResult zcyBankCardPersonalInfo(String name, String idNumber, String mobile, String bankCardNo) {
        // TODO Auto-generated method stub
        return null;
    }

}
