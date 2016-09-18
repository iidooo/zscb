package com.edo.zscb.mapper;

import com.edo.zscb.model.po.PawnPeople;

public interface PawnPeopleMapper {
    int deleteByPrimaryKey(Integer peopleID);

    int insert(PawnPeople record);

    int insertSelective(PawnPeople record);

    PawnPeople selectByPrimaryKey(Integer peopleID);

    int updateByPrimaryKeySelective(PawnPeople record);

    int updateByPrimaryKey(PawnPeople record);
}