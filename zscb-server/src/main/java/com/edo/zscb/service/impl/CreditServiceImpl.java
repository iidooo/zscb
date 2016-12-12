package com.edo.zscb.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edo.zscb.mapper.AssetHouseMapper;
import com.edo.zscb.mapper.AssetVehicleMapper;
import com.edo.zscb.mapper.BussinessMapper;
import com.edo.zscb.mapper.DebtMapper;
import com.edo.zscb.mapper.IdentityMapper;
import com.edo.zscb.mapper.IncomeMapper;
import com.edo.zscb.mapper.LegalBlackMapper;
import com.edo.zscb.mapper.LegalMapper;
import com.edo.zscb.mapper.PawnMapper;
import com.edo.zscb.mapper.RegisterMapper;
import com.edo.zscb.mapper.StaffExpMapper;
import com.edo.zscb.mapper.StaffMapper;
import com.edo.zscb.model.po.AssetHouse;
import com.edo.zscb.model.po.AssetVehicle;
import com.edo.zscb.model.po.Bussiness;
import com.edo.zscb.model.po.Debt;
import com.edo.zscb.model.po.Identity;
import com.edo.zscb.model.po.Income;
import com.edo.zscb.model.po.Legal;
import com.edo.zscb.model.po.LegalBlack;
import com.edo.zscb.model.po.Pawn;
import com.edo.zscb.model.po.Register;
import com.edo.zscb.model.po.Staff;
import com.edo.zscb.model.po.StaffExp;
import com.edo.zscb.model.vo.HouseOwner;
import com.edo.zscb.model.vo.SearchCondition;
import com.edo.zscb.service.CreditService;
import com.iidooo.core.util.StringUtil;

@Service
public class CreditServiceImpl implements CreditService {

    private static final Logger logger = Logger.getLogger(CreditServiceImpl.class);

    @Autowired
    private IdentityMapper identityMapper;

    @Autowired
    private RegisterMapper registerMapper;

    @Autowired
    private StaffMapper staffMapper;

    @Autowired
    private StaffExpMapper staffExpMapper;

    @Autowired
    private BussinessMapper bussinessMapper;

    @Autowired
    private AssetHouseMapper assetHouseMapper;

    @Autowired
    private AssetVehicleMapper assetVehicleMapper;

    @Autowired
    private DebtMapper debtMapper;

    @Autowired
    private IncomeMapper incomeMapper;

    @Autowired
    private LegalMapper legalMapper;
    
    @Autowired
    private LegalBlackMapper legalBlackMapper;

    @Autowired
    private PawnMapper pawnMapper;

    @Transactional
    @Override
    public Identity creditSearch(SearchCondition condition, Integer operatorID) {
        Identity result = new Identity();
        try {
            result.setName(condition.getName());
            result.setIDNumber(condition.getIdNumber());
            result.setMobile(condition.getMobile());
            result.setBankNumber(condition.getCardNumber());
            result.setHouseNumber(condition.getHouseNumber());
            result.setHouseAddress(condition.getHouseAddress());
            result.setHouseArea(condition.getHouseArea());
            result.setMateID(condition.getMateID());
            result.setIsMain(condition.getIsMain());
            result.setDataSource(condition.getDataSource());
            for (HouseOwner item : condition.getHouseOwnerList()) {
                if (StringUtil.isNotBlank(result.getHouseOwnerUserName())) {
                    result.setHouseOwnerUserName(result.getHouseOwnerUserName() + "," + item.getHouseOwnerName());
                }

                if (StringUtil.isNotBlank(result.getHouseOwnerIDNumber())) {
                    result.setHouseOwnerIDNumber(result.getHouseOwnerIDNumber() + "," + item.getHouseOwnerIDNumber());
                }
            }

            Identity existIdentity = identityMapper.selectByIDNumber(condition.getIdNumber(), condition.getDataSource());
            if (existIdentity == null) {
                result.setCreateTime(new Date());
                result.setCreateUserID(operatorID);

                identityMapper.insert(result);
            } else {
                result.setIdentityID(existIdentity.getIdentityID());
                result.setUpdateUserID(operatorID);

                identityMapper.updateByPrimaryKey(result);
            }
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public int getIdentityListCount(SearchCondition condition) {
        int result = 0;
        try {
            result = identityMapper.selectCountForSearch(condition);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public List<Identity> getIdentityList(SearchCondition condition) {
        List<Identity> result = new ArrayList<Identity>();

        try {
            result = identityMapper.selectForSearch(condition);
        } catch (Exception e) {
            logger.fatal(e);
        }

        return result;
    }

    @Override
    public Identity getIdentity(String idNumber, String dataSource) {
        Identity result = new Identity();

        try {
            result = identityMapper.selectByIDNumber(idNumber, dataSource);
        } catch (Exception e) {
            logger.fatal(e);
        }

        return result;
    }

    @Override
    public Register getRegister(String idNumber, String dataSource) {
        Register result = new Register();

        try {
            result = registerMapper.selectByIDNumber(idNumber, dataSource);
        } catch (Exception e) {
            logger.fatal(e);
        }

        return result;
    }

    @Override
    public Staff getStaff(String idNumber, String dataSource) {
        Staff result = new Staff();

        try {
            result = staffMapper.selectByIDNumber(idNumber, dataSource);
        } catch (Exception e) {
            logger.fatal(e);
        }

        return result;
    }

    @Override
    public List<StaffExp> getStaffExpList(String idNumber, String dataSource) {
        List<StaffExp> result = new ArrayList<StaffExp>();

        try {
            result = staffExpMapper.selectStaffExpList(idNumber, dataSource);
        } catch (Exception e) {
            logger.fatal(e);
        }

        return result;
    }

    @Override
    public List<Bussiness> getBussinessList(String idNumber, String dataSource) {
        List<Bussiness> result = new ArrayList<Bussiness>();
        try {
            // result = bussinessMapper.selectByIdentityID(identityID);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public List<AssetHouse> getHouseList(String idNumber, String dataSource) {
        List<AssetHouse> result = new ArrayList<AssetHouse>();
        try {
            // result = assetHouseMapper.selectByIdentityID(identityID);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public List<AssetVehicle> getVehicleList(String idNumber, String dataSource) {
        List<AssetVehicle> result = new ArrayList<AssetVehicle>();
        try {
            result = assetVehicleMapper.selectVehicleList(idNumber, dataSource);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public Debt getDebt(String idNumber, String dataSource) {
        Debt result = new Debt();
        try {
            // result = debtMapper.selectByIdentityID(identityID);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public Income getIncome(String idNumber, String dataSource) {
        Income result = new Income();
        try {
            // result = incomeMapper.selectByIdentityID(identityID);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public Legal getLegal(String idNumber, String dataSource) {
        Legal result = new Legal();
        try {
            // result = legalMapper.selectByIdentityID(identityID);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public List<LegalBlack> getLegalBlackList(String idNumber, String dataSource) {
        List<LegalBlack> result = new ArrayList<LegalBlack>();
        try {
             result = legalBlackMapper.selectLegalBlackList(idNumber, dataSource);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

    @Override
    public Pawn getPawn(String idNumber, String dataSource) {
        Pawn result = new Pawn();
        try {
            // result = pawnMapper.selectByIdentityID(identityID);
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

}
