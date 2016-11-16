package com.edo.zscb.model.vo;

public class WescrPersonInfo {
    
    // 姓名
    private String name;
    
    // 犯案时间
    private String crimetime;
    
    // 犯案记录(比中前科， 在逃， 吸毒)
    private String hethercrime;
    
    // 被查询人身份证号
    private String idNumber;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCrimetime() {
        return crimetime;
    }

    public void setCrimetime(String crimetime) {
        this.crimetime = crimetime;
    }

    public String getHethercrime() {
        return hethercrime;
    }

    public void setHethercrime(String hethercrime) {
        this.hethercrime = hethercrime;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }
    
    
}

