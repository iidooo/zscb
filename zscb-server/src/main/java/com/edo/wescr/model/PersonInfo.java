package com.edo.wescr.model;

import java.util.ArrayList;
import java.util.List;

public class PersonInfo {
    
    // 身份证号
    private String identId;
    
    // 姓名
    private String identName;
    
    // 曾用名
    private String nameUsd;
    
    // 身份证状态
    private String statId;
    
    // 性别
    private String sex;
    
    // 民族
    private String nat;
    
    // 出生日期
    private String dateBirth;
    
    // 婚姻状况
    private String statMa;
    
    // 户籍地址
    private String addHr;
    
    // 户籍所属地区
    private String disHr;
    
    // 籍贯
    private String np;
    
    // 同住人信息
    private List<HouseMateInfo> mcSaddInfoList;
    
    public PersonInfo(){
        mcSaddInfoList = new ArrayList<HouseMateInfo>();
    }

    public String getIdentId() {
        return identId;
    }

    public void setIdentId(String identId) {
        this.identId = identId;
    }

    public String getIdentName() {
        return identName;
    }

    public void setIdentName(String identName) {
        this.identName = identName;
    }

    public String getNameUsd() {
        return nameUsd;
    }

    public void setNameUsd(String nameUsd) {
        this.nameUsd = nameUsd;
    }

    public String getStatId() {
        return statId;
    }

    public void setStatId(String statId) {
        this.statId = statId;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getNat() {
        return nat;
    }

    public void setNat(String nat) {
        this.nat = nat;
    }

    public String getDateBirth() {
        return dateBirth;
    }

    public void setDateBirth(String dateBirth) {
        this.dateBirth = dateBirth;
    }

    public String getStatMa() {
        return statMa;
    }

    public void setStatMa(String statMa) {
        this.statMa = statMa;
    }

    public String getAddHr() {
        return addHr;
    }

    public void setAddHr(String addHr) {
        this.addHr = addHr;
    }

    public String getDisHr() {
        return disHr;
    }

    public void setDisHr(String disHr) {
        this.disHr = disHr;
    }

    public String getNp() {
        return np;
    }

    public void setNp(String np) {
        this.np = np;
    }

    public List<HouseMateInfo> getMcSaddInfoList() {
        return mcSaddInfoList;
    }

    public void setMcSaddInfoList(List<HouseMateInfo> mcSaddInfoList) {
        this.mcSaddInfoList = mcSaddInfoList;
    }
    
    
}
