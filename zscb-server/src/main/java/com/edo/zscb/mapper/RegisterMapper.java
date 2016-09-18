package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Register;

public interface RegisterMapper {
    int deleteByPrimaryKey(Integer registerID);

    int insert(Register record);

    int insertSelective(Register record);

    Register selectByPrimaryKey(Integer registerID);

    int updateByPrimaryKeySelective(Register record);

    int updateByPrimaryKey(Register record);
}