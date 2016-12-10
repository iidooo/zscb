package com.edo.dolphin.model;

public class DriverResource extends Resource{
    
    // 违法种类：WFMS
    private String illegalType;
    
    // 处罚决定书编号:JDSBH
    private String illegalNumber;
    
    // 违法时间:WFSJ
    private String illegalTime;
    
    // 违法地址:WFDZ
    private String illegalAddress;

    // 处理时间:CLSJ
    private String illegalProcessTime;

    public String getIllegalType() {
        return illegalType;
    }

    public void setIllegalType(String illegalType) {
        this.illegalType = illegalType;
    }

    public String getIllegalNumber() {
        return illegalNumber;
    }

    public void setIllegalNumber(String illegalNumber) {
        this.illegalNumber = illegalNumber;
    }

    public String getIllegalTime() {
        return illegalTime;
    }

    public void setIllegalTime(String illegalTime) {
        this.illegalTime = illegalTime;
    }

    public String getIllegalAddress() {
        return illegalAddress;
    }

    public void setIllegalAddress(String illegalAddress) {
        this.illegalAddress = illegalAddress;
    }

    public String getIllegalProcessTime() {
        return illegalProcessTime;
    }

    public void setIllegalProcessTime(String illegalProcessTime) {
        this.illegalProcessTime = illegalProcessTime;
    }

}
