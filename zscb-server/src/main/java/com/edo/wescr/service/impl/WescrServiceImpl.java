package com.edo.wescr.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edo.wescr.constant.WescrConstant;
import com.edo.wescr.model.BlackInfo;
import com.edo.wescr.model.HouseMateInfo;
import com.edo.wescr.model.PersonBadInfo;
import com.edo.wescr.model.PersonInfo;
import com.edo.wescr.model.SocialInfo;
import com.edo.wescr.model.WescrResult;
import com.edo.wescr.service.WescrService;
import com.edo.wescr.util.WescrAPIUtil;
import com.edo.zscb.mapper.LegalBlackMapper;
import com.edo.zscb.mapper.RegisterMapper;
import com.edo.zscb.mapper.StaffExpMapper;
import com.edo.zscb.mapper.StaffMapper;
import com.edo.zscb.model.po.Identity;
import com.edo.zscb.model.po.LegalBlack;
import com.edo.zscb.model.po.Register;
import com.edo.zscb.model.po.Staff;
import com.edo.zscb.model.po.StaffExp;

@Service
public class WescrServiceImpl implements WescrService {
    private static final Logger logger = Logger.getLogger(WescrServiceImpl.class);

    @Autowired
    private LegalBlackMapper legalBlackMapper;

    @Autowired
    private RegisterMapper registerMapper;

    @Autowired
    private StaffMapper staffMapper;

    @Autowired
    private StaffExpMapper staffExpMapper;

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
                legalBlack.setRecordTime(personBadInfo.getCrimetime().substring(0, 19));
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
    public WescrResult getPersonalHouseMate(Integer operatorID, String name, String idNumber) {
        WescrResult result = new WescrResult();
        try {
            String key = WescrAPIUtil.randChar(10);
            String prikey = WescrAPIUtil.publicEnc(key, WescrConstant.WESCR_SECRET_KEY);
            Map<String, String> Objparameters = new HashMap<String, String>();
            Objparameters.put("userId", WescrConstant.WESCR_LOGIN_ID);// 用户名
            Objparameters.put("secretKey", prikey);
            Objparameters.put("userPwd", WescrAPIUtil.getEncString(WescrConstant.WESCR_LOGIN_PASSWORD, key));// 密码
            Objparameters.put("name", WescrAPIUtil.getEncString(name, key));// 参数
            Objparameters.put("card", WescrAPIUtil.getEncString(idNumber, key));// 参数
            String jsonString = WescrAPIUtil.execute(WescrConstant.WESCR_GET_PERSONAL_HOUSE_MATE, Objparameters);// 方法名

            JSONObject json = JSONObject.fromObject(jsonString);
            String code = json.getString("CODE");
            if ("200".equals(code)) {
                result.setCode(code);
                result.setMessage(json.getString("MESSAGE"));
                PersonInfo personInfo = (PersonInfo) JSONObject.toBean(json.getJSONObject("resultInfo"), PersonInfo.class);
                @SuppressWarnings("unchecked")
                List<HouseMateInfo> houseMateInfoList = (List<HouseMateInfo>) JSONArray.toCollection(json.getJSONArray("mcSaddInfoList"),
                        HouseMateInfo.class);
                personInfo.setMcSaddInfoList(houseMateInfoList);
                result.setData(personInfo);

                Register register = new Register();
                register.setIdNumber(personInfo.getIdentId());
                register.setMarryStatus(personInfo.getStatMa());
                register.setRegisterAddress(personInfo.getAddHr());
                register.setRootAddress(personInfo.getNp());
                register.setUsedName(personInfo.getNameUsd());
                register.setDataSource(WescrConstant.DATA_SOURCE);

                Register existRegister = registerMapper.selectByIDNumber(idNumber);
                if (existRegister == null) {
                    register.setCreateTime(new Date());
                    register.setCreateUserID(operatorID);
                    registerMapper.insert(register);
                } else {
                    register.setRegisterID(existRegister.getRegisterID());
                    register.setUpdateUserID(operatorID);
                    registerMapper.updateByPrimaryKey(register);
                }

                for (HouseMateInfo item : personInfo.getMcSaddInfoList()) {
                    Register houseMate = new Register();
                    houseMate.setUsedName(item.getNameSadd());
                    houseMate.setDataSource(WescrConstant.DATA_SOURCE);
                    houseMate.setParentID(register.getRegisterID());

                    Register existRegisterMate = registerMapper.selectRegisterMate(register.getRegisterID(), name);
                    if (existRegisterMate == null) {
                        houseMate.setCreateTime(new Date());
                        houseMate.setCreateUserID(operatorID);
                        registerMapper.insert(houseMate);
                    } else {
                        houseMate.setRegisterID(existRegisterMate.getRegisterID());
                        houseMate.setUpdateUserID(operatorID);
                        registerMapper.updateByPrimaryKey(houseMate);
                    }
                }
            }
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public WescrResult getBlackListByIdentityCard(Integer operatorID, String name, String idNumber) {
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
            String jsonString = WescrAPIUtil.execute(WescrConstant.WESCR_GET_BLACK_LIST_BY_IDENTITY_CARD, Objparameters);// 方法名

            JSONObject json = JSONObject.fromObject(jsonString);
            String code = json.getString("CODE");
            if ("0".equals(code)) {
                result.setCode(code);
                result.setMessage(json.getString("MESSAGE"));
                @SuppressWarnings("unchecked")
                List<BlackInfo> blackInfoList = (List<BlackInfo>) JSONArray.toCollection(json.getJSONArray("data"), BlackInfo.class);
                result.setData(blackInfoList);

                for (BlackInfo item : blackInfoList) {
                    LegalBlack legalBlack = new LegalBlack();
                    legalBlack.setIdNumber(idNumber);
                    legalBlack.setDetail(item.getType() + item.getOverdue_date());
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

            }
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public WescrResult queryPersonalSocialInfo(Integer operatorID, String name, String idNumber, String mobile) {
        WescrResult result = new WescrResult();
        try {
            String key = WescrAPIUtil.randChar(10);
            String prikey = WescrAPIUtil.publicEnc(key, WescrConstant.WESCR_SECRET_KEY);
            Map<String, String> Objparameters = new HashMap<String, String>();
            Objparameters.put("userId", WescrConstant.WESCR_LOGIN_ID);// 用户名
            Objparameters.put("secretKey", prikey);
            Objparameters.put("userPwd", WescrAPIUtil.getEncString(WescrConstant.WESCR_LOGIN_PASSWORD, key));// 密码
            Objparameters.put("name", WescrAPIUtil.getEncString(name, key));// 参数
            Objparameters.put("card", WescrAPIUtil.getEncString(idNumber, key));// 参数
            Objparameters.put("mobile", WescrAPIUtil.getEncString(mobile, key));// 参数
            String jsonString = WescrAPIUtil.execute(WescrConstant.WESCR_QUERY_PERSONLAL_SOCIAL_INFO, Objparameters);// 方法名

            JSONObject json = JSONObject.fromObject(jsonString);
            String code = json.getString("CODE");
            if ("0".equals(code)) {
                
                result.setCode(code);
                result.setMessage(json.getString("MESSAGE"));
                @SuppressWarnings("unchecked")
                List<SocialInfo> socialInfoList = (List<SocialInfo>) JSONArray.toCollection(json.getJSONArray("socialList"), SocialInfo.class);
                result.setData(socialInfoList);

                for (SocialInfo item : socialInfoList) {
                    StaffExp staffExp = new StaffExp();
                    staffExp.setIdNumber(idNumber);
                    staffExp.setEnterDate(item.getJdwrq());
                    staffExp.setLeaveDate(item.getZxgxsj().substring(0, 8));
                    staffExp.setCompany(item.getDwmc());
                    staffExp.setDataSource(WescrConstant.DATA_SOURCE);

                    StaffExp existStaffExp = staffExpMapper.selectStaffExp(idNumber, staffExp.getEnterDate());
                    if (existStaffExp == null) {
                        staffExp.setCreateTime(new Date());
                        staffExp.setCreateUserID(operatorID);
                        staffExpMapper.insert(staffExp);
                    } else {
                        staffExp.setExpID(existStaffExp.getExpID());
                        staffExp.setUpdateUserID(operatorID);
                        staffExpMapper.updateByPrimaryKey(staffExp);
                    }

                    if ("是".equals(item.getJnshbxjzthz())) {
                        Staff staff = new Staff();
                        staff.setIdNumber(idNumber);
                        staff.setSocialCompany(item.getDwmc());
                        staff.setSocialStatus(item.getJnshbxjzthz());
                        staff.setDataSource(WescrConstant.DATA_SOURCE);

                        Staff existStaff = staffMapper.selectByIDNumber(idNumber);
                        if (existStaff == null) {
                            staff.setCreateTime(new Date());
                            staff.setCreateUserID(operatorID);
                            staffMapper.insert(staff);
                        } else {
                            staff.setStaffID(existStaff.getStaffID());
                            staff.setUpdateUserID(operatorID);
                            staffMapper.updateByPrimaryKey(staff);
                        }
                    }
                }

            }
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public WescrResult zcyBankCardPersonalInfo(Integer operatorID, String name, String idNumber, String mobile, String bankCardNo) {
        // TODO Auto-generated method stub
        return null;
    }

}
