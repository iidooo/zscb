package com.edo.zscb.model.vo;

import java.util.ArrayList;
import java.util.List;

public class CreditSearchCondition {
    private String selfName;
    private String selfIDNumber;
    private String selfMobile;
    private String selfCardNumber;

    private String mateName;
    private String mateIDNumber;
    private String mateMobile;
    private String mateCardNumber;

    private String houseNumber;
    private String houseAddress;
    private String houseArea;
    private List<CreditSearchHouseOwner> houseOwnerList;

    public CreditSearchCondition() {
        houseOwnerList = new ArrayList<CreditSearchHouseOwner>();
    }

    public String getSelfName() {
        return selfName;
    }

    public void setSelfName(String selfName) {
        this.selfName = selfName;
    }

    public String getSelfIDNumber() {
        return selfIDNumber;
    }

    public void setSelfIDNumber(String selfIDNumber) {
        this.selfIDNumber = selfIDNumber;
    }

    public String getSelfMobile() {
        return selfMobile;
    }

    public void setSelfMobile(String selfMobile) {
        this.selfMobile = selfMobile;
    }

    public String getSelfCardNumber() {
        return selfCardNumber;
    }

    public void setSelfCardNumber(String selfCardNumber) {
        this.selfCardNumber = selfCardNumber;
    }

    public String getMateName() {
        return mateName;
    }

    public void setMateName(String mateName) {
        this.mateName = mateName;
    }

    public String getMateIDNumber() {
        return mateIDNumber;
    }

    public void setMateIDNumber(String mateIDNumber) {
        this.mateIDNumber = mateIDNumber;
    }

    public String getMateMobile() {
        return mateMobile;
    }

    public void setMateMobile(String mateMobile) {
        this.mateMobile = mateMobile;
    }

    public String getMateCardNumber() {
        return mateCardNumber;
    }

    public void setMateCardNumber(String mateCardNumber) {
        this.mateCardNumber = mateCardNumber;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getHouseAddress() {
        return houseAddress;
    }

    public void setHouseAddress(String houseAddress) {
        this.houseAddress = houseAddress;
    }

    public String getHouseArea() {
        return houseArea;
    }

    public void setHouseArea(String houseArea) {
        this.houseArea = houseArea;
    }

    public List<CreditSearchHouseOwner> getHouseOwnerList() {
        return houseOwnerList;
    }

    public void setHouseOwnerList(List<CreditSearchHouseOwner> houseOwnerList) {
        this.houseOwnerList = houseOwnerList;
    }

}
