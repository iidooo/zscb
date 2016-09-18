package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Legal;

public interface LegalMapper {
    int deleteByPrimaryKey(Integer legalID);

    int insert(Legal record);

    int insertSelective(Legal record);

    Legal selectByPrimaryKey(Integer legalID);

    int updateByPrimaryKeySelective(Legal record);

    int updateByPrimaryKey(Legal record);
}