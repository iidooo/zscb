package com.edo.zscb.mapper;

import com.edo.zscb.model.po.LegalBlack;

public interface LegalBlackMapper {
    int deleteByPrimaryKey(Integer blackID);

    /**
     * 插入黑名单对象
     * @param record 黑名单对象
     * @return 插入操作所影响的行数
     */
    int insert(LegalBlack record);

    /**
     * 通过身份证ID获取黑名单对象
     * @param idNumber 身份证ID
     * @return 黑名单对象
     */
    LegalBlack selectByIDNumber(String idNumber);

    LegalBlack selectByPrimaryKey(Integer blackID);

    /**
     * 更新现存的黑名单对象
     * @param record 新的黑名单对象
     * @return 更新操作所影响的行数
     */
    int updateByPrimaryKey(LegalBlack record);
}