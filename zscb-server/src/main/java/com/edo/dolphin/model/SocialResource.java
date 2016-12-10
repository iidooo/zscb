package com.edo.dolphin.model;

public class SocialResource extends Resource {
    
    // 社会保险登记号:SHBXDJM
    private String registerCode;
    
    // 单位名称:DWMC
    private String companyName;
    
    // 缴纳社会保险金状态:JNSHBXJZTHZ
    private String socialPayStatus;
    
    // 领取社会保险金状态:LQYLJZTHZ
    private String socialGetStatus;
    
    // 工作时间:JDWRQ
    private String socialStartTime;
    
    // 最新缴纳时间:ZXGXSJ
    private String socialUpdateTime;

    public String getRegisterCode() {
        return registerCode;
    }

    public void setRegisterCode(String registerCode) {
        this.registerCode = registerCode;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getSocialPayStatus() {
        return socialPayStatus;
    }

    public void setSocialPayStatus(String socialPayStatus) {
        this.socialPayStatus = socialPayStatus;
    }

    public String getSocialGetStatus() {
        return socialGetStatus;
    }

    public void setSocialGetStatus(String socialGetStatus) {
        this.socialGetStatus = socialGetStatus;
    }

    public String getSocialStartTime() {
        return socialStartTime;
    }

    public void setSocialStartTime(String socialStartTime) {
        this.socialStartTime = socialStartTime;
    }

    public String getSocialUpdateTime() {
        return socialUpdateTime;
    }

    public void setSocialUpdateTime(String socialUpdateTime) {
        this.socialUpdateTime = socialUpdateTime;
    }
    
    
}
