package com.edo.zscb.model.po;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Pawn {
    private Integer pawnID;

    private Integer identityID;

    private String houseNo;

    private BigDecimal houseWorth;

    private Integer houseAge;

    private Integer registerNum;

    private String district;

    private String address;

    private String remarks;

    private Date updateTime;

    private Integer updateUserID;

    private Date createTime;

    private Integer createUserID;

    private Boolean isDelete;

    private Integer version;
    
    private List<PawnPeople> peopleList;

    public Integer getPawnID() {
        return pawnID;
    }

    public void setPawnID(Integer pawnID) {
        this.pawnID = pawnID;
    }

    public Integer getIdentityID() {
        return identityID;
    }

    public void setIdentityID(Integer identityID) {
        this.identityID = identityID;
    }

    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo == null ? null : houseNo.trim();
    }

    public BigDecimal getHouseWorth() {
        return houseWorth;
    }

    public void setHouseWorth(BigDecimal houseWorth) {
        this.houseWorth = houseWorth;
    }

    public Integer getHouseAge() {
        return houseAge;
    }

    public void setHouseAge(Integer houseAge) {
        this.houseAge = houseAge;
    }

    public Integer getRegisterNum() {
        return registerNum;
    }

    public void setRegisterNum(Integer registerNum) {
        this.registerNum = registerNum;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district == null ? null : district.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
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

    public List<PawnPeople> getPeopleList() {
        return peopleList;
    }

    public void setPeopleList(List<PawnPeople> peopleList) {
        this.peopleList = peopleList;
    }
    
    public Pawn(){
        this.peopleList = new ArrayList<PawnPeople>();
    }
}