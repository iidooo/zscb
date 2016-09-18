package com.edo.zscb.model.po;

import java.math.BigDecimal;
import java.util.Date;

public class Debt {
    private Integer houseID;

    private Integer identityID;

    private Integer housingLoanNum;

    private BigDecimal housingLoanAmount;

    private Integer tradLoanNum;

    private BigDecimal tradLoanAmount;

    private Integer otherLoanNum;

    private BigDecimal otherLoanAmount;

    private Integer creditCardNum;

    private BigDecimal creditCardAmount;

    private Integer overdueLoanNum;

    private Integer overdueLoanNumTerm;

    private String overdueLoanAccount;

    private Integer overdueLoanAccountTerm;

    private Integer guaranteeNum;

    private BigDecimal guaranteeAmount;

    private BigDecimal loanRepayAmount;

    private BigDecimal creditUsedAmount;

    private BigDecimal creditOverdraftAmount;

    private String remarks;

    private Date updateTime;

    private Integer updateUserID;

    private Date createTime;

    private Integer createUserID;

    private Boolean isDelete;

    private Integer version;

    public Integer getHouseID() {
        return houseID;
    }

    public void setHouseID(Integer houseID) {
        this.houseID = houseID;
    }

    public Integer getIdentityID() {
        return identityID;
    }

    public void setIdentityID(Integer identityID) {
        this.identityID = identityID;
    }

    public Integer getHousingLoanNum() {
        return housingLoanNum;
    }

    public void setHousingLoanNum(Integer housingLoanNum) {
        this.housingLoanNum = housingLoanNum;
    }

    public BigDecimal getHousingLoanAmount() {
        return housingLoanAmount;
    }

    public void setHousingLoanAmount(BigDecimal housingLoanAmount) {
        this.housingLoanAmount = housingLoanAmount;
    }

    public Integer getTradLoanNum() {
        return tradLoanNum;
    }

    public void setTradLoanNum(Integer tradLoanNum) {
        this.tradLoanNum = tradLoanNum;
    }

    public BigDecimal getTradLoanAmount() {
        return tradLoanAmount;
    }

    public void setTradLoanAmount(BigDecimal tradLoanAmount) {
        this.tradLoanAmount = tradLoanAmount;
    }

    public Integer getOtherLoanNum() {
        return otherLoanNum;
    }

    public void setOtherLoanNum(Integer otherLoanNum) {
        this.otherLoanNum = otherLoanNum;
    }

    public BigDecimal getOtherLoanAmount() {
        return otherLoanAmount;
    }

    public void setOtherLoanAmount(BigDecimal otherLoanAmount) {
        this.otherLoanAmount = otherLoanAmount;
    }

    public Integer getCreditCardNum() {
        return creditCardNum;
    }

    public void setCreditCardNum(Integer creditCardNum) {
        this.creditCardNum = creditCardNum;
    }

    public BigDecimal getCreditCardAmount() {
        return creditCardAmount;
    }

    public void setCreditCardAmount(BigDecimal creditCardAmount) {
        this.creditCardAmount = creditCardAmount;
    }

    public Integer getOverdueLoanNum() {
        return overdueLoanNum;
    }

    public void setOverdueLoanNum(Integer overdueLoanNum) {
        this.overdueLoanNum = overdueLoanNum;
    }

    public Integer getOverdueLoanNumTerm() {
        return overdueLoanNumTerm;
    }

    public void setOverdueLoanNumTerm(Integer overdueLoanNumTerm) {
        this.overdueLoanNumTerm = overdueLoanNumTerm;
    }

    public String getOverdueLoanAccount() {
        return overdueLoanAccount;
    }

    public void setOverdueLoanAccount(String overdueLoanAccount) {
        this.overdueLoanAccount = overdueLoanAccount == null ? null : overdueLoanAccount.trim();
    }

    public Integer getOverdueLoanAccountTerm() {
        return overdueLoanAccountTerm;
    }

    public void setOverdueLoanAccountTerm(Integer overdueLoanAccountTerm) {
        this.overdueLoanAccountTerm = overdueLoanAccountTerm;
    }

    public Integer getGuaranteeNum() {
        return guaranteeNum;
    }

    public void setGuaranteeNum(Integer guaranteeNum) {
        this.guaranteeNum = guaranteeNum;
    }

    public BigDecimal getGuaranteeAmount() {
        return guaranteeAmount;
    }

    public void setGuaranteeAmount(BigDecimal guaranteeAmount) {
        this.guaranteeAmount = guaranteeAmount;
    }

    public BigDecimal getLoanRepayAmount() {
        return loanRepayAmount;
    }

    public void setLoanRepayAmount(BigDecimal loanRepayAmount) {
        this.loanRepayAmount = loanRepayAmount;
    }

    public BigDecimal getCreditUsedAmount() {
        return creditUsedAmount;
    }

    public void setCreditUsedAmount(BigDecimal creditUsedAmount) {
        this.creditUsedAmount = creditUsedAmount;
    }

    public BigDecimal getCreditOverdraftAmount() {
        return creditOverdraftAmount;
    }

    public void setCreditOverdraftAmount(BigDecimal creditOverdraftAmount) {
        this.creditOverdraftAmount = creditOverdraftAmount;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks == null ? null : remarks.trim();
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getUpdateUserID() {
        return updateUserID;
    }

    public void setUpdateUserID(Integer updateUserID) {
        this.updateUserID = updateUserID;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getCreateUserID() {
        return createUserID;
    }

    public void setCreateUserID(Integer createUserID) {
        this.createUserID = createUserID;
    }

    public Boolean getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}