package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Pawn;

public interface PawnMapper {
    int deleteByPrimaryKey(Integer pawnID);

    int insert(Pawn record);

    int insertSelective(Pawn record);

    Pawn selectByPrimaryKey(Integer pawnID);
    
    /**
     * 通过IdentityID获得抵押信息
     * @param identityID 身份ID
     * @return 抵押信息对象
     */
    Pawn selectByIdentityID(Integer identityID);

    int updateByPrimaryKeySelective(Pawn record);

    int updateByPrimaryKey(Pawn record);
}