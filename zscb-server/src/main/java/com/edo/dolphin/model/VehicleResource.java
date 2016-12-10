package com.edo.dolphin.model;

public class VehicleResource extends Resource {

    // 号牌种类:HPZL
    private String licenseType;

    // 号牌号码:HPHM
    private String licenseNumber;

    // 初次登记时间:CCDJRQ
    private String registerTime;

    // 检验有效期止:YXQZ
    private String inspectionValidityDate;

    // 最近定检日期:DJRQ
    private String inspectionDate;

    // 强制报废期止:QZBFQZ
    private String retirementDate;

    // 保修终止日期:BXZZRQ
    private String repairDate;

    // 管理辖区:XZQH
    private String registerArea;

    // 机动车状态:ZTHZ
    private String status;

    // 是否抵押:DYBJHZ
    private String isMortgage;

    public String getLicenseType() {
        return licenseType;
    }

    public void setLicenseType(String licenseType) {
        this.licenseType = licenseType;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(String registerTime) {
        this.registerTime = registerTime;
    }

    public String getInspectionValidityDate() {
        return inspectionValidityDate;
    }

    public void setInspectionValidityDate(String inspectionValidityDate) {
        this.inspectionValidityDate = inspectionValidityDate;
    }

    public String getInspectionDate() {
        return inspectionDate;
    }

    public void setInspectionDate(String inspectionDate) {
        this.inspectionDate = inspectionDate;
    }

    public String getRetirementDate() {
        return retirementDate;
    }

    public void setRetirementDate(String retirementDate) {
        this.retirementDate = retirementDate;
    }

    public String getRepairDate() {
        return repairDate;
    }

    public void setRepairDate(String repairDate) {
        this.repairDate = repairDate;
    }

    public String getRegisterArea() {
        return registerArea;
    }

    public void setRegisterArea(String registerArea) {
        this.registerArea = registerArea;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIsMortgage() {
        return isMortgage;
    }

    public void setIsMortgage(String isMortgage) {
        this.isMortgage = isMortgage;
    }
    
    

}
