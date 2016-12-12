package com.edo.zscb.mapper;

import org.apache.ibatis.annotations.Param;

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
    Register selectByIDNumber(@Param("idNumber")String idNumber, @Param("dataSource")String dataSource);

    /**
     * 获取同住人信息
     * @param parentID 主要户籍用户
     * @param name 同住人姓名
     * @return 同住人对象
     */
    Register selectRegisterMate(@Param("parentID")Integer parentID, @Param("name")String name);
    
    /**
     * 更新户籍信息
     * @param record 户籍信息对象
     * @return 更新操作所影响的行数
     */
    int updateByPrimaryKey(Register record);
}