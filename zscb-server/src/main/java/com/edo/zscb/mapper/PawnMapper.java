package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Pawn;

public interface PawnMapper {
    int deleteByPrimaryKey(Integer pawnID);

    int insert(Pawn record);

    int insertSelective(Pawn record);

    Pawn selectByPrimaryKey(Integer pawnID);

    int updateByPrimaryKeySelective(Pawn record);

    int updateByPrimaryKey(Pawn record);
}