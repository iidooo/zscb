package com.edo.dolphin.model;

public class MarryResource extends Resource {
    
    // 登记机关:DJJG
    private String registerOrg;
    
    // 登记日期:DJRQ
    private String registerDate;
    
    // 证书编号:ZSBH
    private String registerNumber;
    
    // 配偶姓名:POXM
    private String mateName;

    public String getRegisterOrg() {
        return registerOrg;
    }

    public void setRegisterOrg(String registerOrg) {
        this.registerOrg = registerOrg;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public String getRegisterNumber() {
        return registerNumber;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }

    public String getMateName() {
        return mateName;
    }

    public void setMateName(String mateName) {
        this.mateName = mateName;
    }
    
    
}
