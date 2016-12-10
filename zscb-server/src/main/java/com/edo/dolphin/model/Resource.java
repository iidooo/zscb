package com.edo.dolphin.model;

public class Resource {

    /*
     * RESOURCES:资源代码 社会保险信息:GRZX130000005 公积金缴纳信息:XY0700050207030001 结婚信息:GRZX100000007 离婚信息:GRZX100000008 公安违法信息:GRZX080000032
     * 车辆信息:GRZX080000040 驾驶员酒驾信息:GRZX080000039 肇事逃逸信息:GRZX080000038
     */
    private String resourceCode;

    // RESOURCENAME:资源名称
    private String resourceName;

    // XXSSDWDM:信息所属单位代码
    private String unitCode;

    // XXSSDW:信息所属单位
    private String unitName;

    // XXLB:信息类别
    private String category;

    public String getResourceCode() {
        return resourceCode;
    }

    public void setResourceCode(String resourceCode) {
        this.resourceCode = resourceCode;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getUnitCode() {
        return unitCode;
    }

    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
