package com.edo.zscb.model.vo;

import net.sf.json.JSONObject;

public class BigDOrderDetailResult {

    // 手机号与姓名是否匹配
    private String tn_is_match;

    // 登记人身份证与姓名是否匹配
    private String idn_is_match;

    // 手机号和身份证是否匹配
    private String tid_is_match;

    // 手机号，姓名，身份证是否匹配
    private String tnid_is_match;

    // 年龄层次
    private String age;

    // 性别
    private String sex;

    // 终端厂商
    private String terminal_manufactures;

    // 终端机型
    private String terminal_model;

    // 操作系统
    private String operating_system;

    // 手机入网时间
    private String in_date;

    // 手机入网时长
    private String in_time;

    public BigDOrderDetailResult() {
    }

    public BigDOrderDetailResult(JSONObject json) {
        if (json.containsKey("tn_is_match")) {
            this.tn_is_match = json.getString("tn_is_match");
        }
        if (json.containsKey("idn_is_match")) {
            this.idn_is_match = json.getString("idn_is_match");            
        }
        if (json.containsKey("tid_is_match")) {
            this.tid_is_match = json.getString("tid_is_match");            
        }
        if (json.containsKey("tnid_is_match")) {
            this.tnid_is_match = json.getString("tnid_is_match");            
        }
        if (json.containsKey("age")) {
            this.age = json.getString("age");            
        }
        if (json.containsKey("sex")) {
            this.sex = json.getString("sex");            
        }
        if (json.containsKey("terminal_manufactures")) {
            this.terminal_manufactures = json.getString("terminal_manufactures");            
        }
        if (json.containsKey("terminal_model")) {
            this.terminal_model = json.getString("terminal_model");            
        }
        if (json.containsKey("operating_system")) {
            this.operating_system = json.getString("operating_system");            
        }
        if (json.containsKey("in_date")) {
            this.in_date = json.getString("in_date");            
        }
        if (json.containsKey("in_time")) {
            this.in_time = json.getString("in_time");            
        }


    }

    public String getTnid_is_match() {
        return tnid_is_match;
    }

    public void setTnid_is_match(String tnid_is_match) {
        this.tnid_is_match = tnid_is_match;
    }

    public String getTn_is_match() {
        return tn_is_match;
    }

    public void setTn_is_match(String tn_is_match) {
        this.tn_is_match = tn_is_match;
    }

    public String getIdn_is_match() {
        return idn_is_match;
    }

    public void setIdn_is_match(String idn_is_match) {
        this.idn_is_match = idn_is_match;
    }

    public String getTid_is_match() {
        return tid_is_match;
    }

    public void setTid_is_match(String tid_is_match) {
        this.tid_is_match = tid_is_match;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getTerminal_manufactures() {
        return terminal_manufactures;
    }

    public void setTerminal_manufactures(String terminal_manufactures) {
        this.terminal_manufactures = terminal_manufactures;
    }

    public String getTerminal_model() {
        return terminal_model;
    }

    public void setTerminal_model(String terminal_model) {
        this.terminal_model = terminal_model;
    }

    public String getOperating_system() {
        return operating_system;
    }

    public void setOperating_system(String operating_system) {
        this.operating_system = operating_system;
    }

    public String getIn_date() {
        return in_date;
    }

    public void setIn_date(String in_date) {
        this.in_date = in_date;
    }

    public String getIn_time() {
        return in_time;
    }

    public void setIn_time(String in_time) {
        this.in_time = in_time;
    }

}
