package com.edo.dolphin.model;

import java.util.ArrayList;
import java.util.List;

public class DolphinResult {

    // 姓名
    private String name;

    // 证件号码:zjhm
    private String idNumber;

    // 查询编号:cxbh
    private String searchNo;

    /*
     * 接口返回状态编码 1001:接口获取用户信息异常 1002:用户名或密码错误 1003:查无此人 1004:程序未知异常 1005:查询成功 1006:传入姓名，证件号码，手机号为空或者格式不正确 格式要求：姓名为中文，证件号码18位，手机号11位
     * 1007:IP未授权
     */
    private String result;

    // 存储数据的列表
    private List<Resource> resources;

    public DolphinResult() {
        resources = new ArrayList<Resource>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getSearchNo() {
        return searchNo;
    }

    public void setSearchNo(String searchNo) {
        this.searchNo = searchNo;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public List<Resource> getResources() {
        return resources;
    }

    public void setResources(List<Resource> resources) {
        this.resources = resources;
    }

}
