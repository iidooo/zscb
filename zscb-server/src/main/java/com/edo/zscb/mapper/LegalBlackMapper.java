package com.edo.zscb.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

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
    LegalBlack selectLegalBlack(LegalBlack record);
    
    /**
     * 获得黑名单信息一览
     * @param idNumber 身份证号
     * @param dataSource 数据源
     * @return 黑名单列表
     */
    List<LegalBlack> selectLegalBlackList(@Param("idNumber")String idNumber, @Param("dataSource")String dataSource);

    LegalBlack selectByPrimaryKey(Integer blackID);

    /**
     * 更新现存的黑名单对象
     * @param record 新的黑名单对象
     * @return 更新操作所影响的行数
     */
    int updateByPrimaryKey(LegalBlack record);
}