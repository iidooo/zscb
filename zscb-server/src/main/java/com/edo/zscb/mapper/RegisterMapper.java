package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Register;

public interface RegisterMapper {
    int deleteByPrimaryKey(Integer registerID);
    
    /**
     * 插入一个户籍信息
     * @param record 户籍信息对象
     * @return 插入操作所影响的行数
     */
    int insert(Register record);

    Register selectByPrimaryKey(Integer registerID);

    /**
     * 通过身份ID获取注册户籍信息
     * @param idNumber 身份ID
     * @return 户籍信息
     */
    Register selectByIDNumber(String idNumber);

    /**
     * 更新户籍信息
     * @param record 户籍信息对象
     * @return 更新操作所影响的行数
     */
    int updateByPrimaryKey(Register record);
}