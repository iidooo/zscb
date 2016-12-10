package com.edo.wescr.model;

public class WescrResult {
    
    /*
     * {"CODE":"201","MESSAGE":"查询无结果"}
     * {"CODE":"300","MESSAGE":"用户验证失败，请检查用户参数"}
     * {"CODE":"301","MESSAGE":"用户验证失败，已被删除"}
     * {"CODE":"302","MESSAGE":"查询参数错误，请检查"}
     * {"CODE":"500","MESSAGE":"查询失败"}
     */
    private String code;
    
    private String message;
    
    // 存在
    private String identId;
    
    // identName
    private String identName;
    
    private Object data;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    
    
}
