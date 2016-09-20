package com.edo.zscb.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edo.zscb.model.po.AssetHouse;
import com.edo.zscb.model.po.AssetVehicle;
import com.edo.zscb.model.po.Bussiness;
import com.edo.zscb.model.po.Debt;
import com.edo.zscb.model.po.Identity;
import com.edo.zscb.model.po.Income;
import com.edo.zscb.model.po.Legal;
import com.edo.zscb.model.po.Pawn;
import com.edo.zscb.model.po.Register;
import com.edo.zscb.model.po.Staff;
import com.edo.zscb.model.vo.SearchCondition;
import com.edo.zscb.service.CreditService;
import com.iidooo.core.constant.RegularConstant;
import com.iidooo.core.enums.ResponseStatus;
import com.iidooo.core.model.Page;
import com.iidooo.core.model.ResponseResult;
import com.iidooo.core.util.PageUtil;
import com.iidooo.core.util.StringUtil;
import com.iidooo.core.util.ValidateUtil;

@Controller
public class CreditAction {

    private static final Logger logger = Logger.getLogger(CreditAction.class);

    @Autowired
    private CreditService creditService;

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getIdentityList" }, method = RequestMethod.POST)
    public ResponseResult getIdentityList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String name = request.getParameter("name");
            String idNumber = request.getParameter("idNumber");
            String mobile = request.getParameter("mobile");

            SearchCondition condition = new SearchCondition();
            condition.setName(name);
            condition.setIdNumber(idNumber);
            condition.setMobile(mobile);

            int recordSum = creditService.getIdentityListCount(condition);

            Page page = new Page();
            String sortField = request.getParameter("sortField");
            if (StringUtil.isNotBlank(sortField)) {
                page.setSortField(sortField);
            }
            String sortType = request.getParameter("sortType");
            if (StringUtil.isNotBlank(sortType)) {
                page.setSortType(sortType);
            }
            String pageSize = request.getParameter("pageSize");
            if (StringUtil.isNotBlank(pageSize) && ValidateUtil.isMatch(pageSize, RegularConstant.REGEX_NUMBER)) {
                page.setPageSize(Integer.parseInt(pageSize));
            }
            String currentPage = request.getParameter("currentPage");
            if (StringUtil.isNotBlank(currentPage) && ValidateUtil.isMatch(currentPage, RegularConstant.REGEX_NUMBER)
                    && Integer.parseInt(currentPage) > 0) {
                page.setCurrentPage(Integer.parseInt(currentPage));
            }
            page = PageUtil.executePage(recordSum, page);
            condition.setPage(page);

            List<Identity> identityList = creditService.getIdentityList(condition);

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("page", page);
            data.put("identityList", identityList);
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(data);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getIdentityInfo" }, method = RequestMethod.POST)
    public ResponseResult getIdentityInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String identityID = request.getParameter("identityID");
            
            result.checkFieldRequired("identityID", identityID);
            result.checkFieldInteger("identityID", identityID);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Identity identity = creditService.getIdentity(Integer.parseInt(identityID));
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(identity);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getRegisterInfo" }, method = RequestMethod.POST)
    public ResponseResult getRegisterInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String identityID = request.getParameter("identityID");
            
            result.checkFieldRequired("identityID", identityID);
            result.checkFieldInteger("identityID", identityID);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Register register = creditService.getRegister(Integer.parseInt(identityID));
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(register);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getStaffInfo" }, method = RequestMethod.POST)
    public ResponseResult getStaffInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String identityID = request.getParameter("identityID");
            
            result.checkFieldRequired("identityID", identityID);
            result.checkFieldInteger("identityID", identityID);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Staff staff = creditService.getStaff(Integer.parseInt(identityID));
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(staff);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getBussinessList" }, method = RequestMethod.POST)
    public ResponseResult getBussinessList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String identityID = request.getParameter("identityID");
            
            result.checkFieldRequired("identityID", identityID);
            result.checkFieldInteger("identityID", identityID);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            List<Bussiness> bussinessList = creditService.getBussinessList(Integer.parseInt(identityID));
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(bussinessList);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getHouseList" }, method = RequestMethod.POST)
    public ResponseResult getHouseList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String identityID = request.getParameter("identityID");
            
            result.checkFieldRequired("identityID", identityID);
            result.checkFieldInteger("identityID", identityID);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            List<AssetHouse> houseList = creditService.getHouseList(Integer.parseInt(identityID));
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(houseList);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getVehicleList" }, method = RequestMethod.POST)
    public ResponseResult getVehicleList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String identityID = request.getParameter("identityID");
            
            result.checkFieldRequired("identityID", identityID);
            result.checkFieldInteger("identityID", identityID);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            List<AssetVehicle> vehicleList = creditService.getVehicleList(Integer.parseInt(identityID));
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(vehicleList);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getDebtInfo" }, method = RequestMethod.POST)
    public ResponseResult getDebtInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String identityID = request.getParameter("identityID");
            
            result.checkFieldRequired("identityID", identityID);
            result.checkFieldInteger("identityID", identityID);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Debt debt = creditService.getDebt(Integer.parseInt(identityID));
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(debt);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getIncomeInfo" }, method = RequestMethod.POST)
    public ResponseResult getIncomeInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String identityID = request.getParameter("identityID");
            
            result.checkFieldRequired("identityID", identityID);
            result.checkFieldInteger("identityID", identityID);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Income income = creditService.getIncome(Integer.parseInt(identityID));
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(income);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getLegalInfo" }, method = RequestMethod.POST)
    public ResponseResult getLegalInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String identityID = request.getParameter("identityID");
            
            result.checkFieldRequired("identityID", identityID);
            result.checkFieldInteger("identityID", identityID);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Legal legal = creditService.getLegal(Integer.parseInt(identityID));
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(legal);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getPawnInfo" }, method = RequestMethod.POST)
    public ResponseResult getPawnInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String identityID = request.getParameter("identityID");
            
            result.checkFieldRequired("identityID", identityID);
            result.checkFieldInteger("identityID", identityID);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Pawn pawn = creditService.getPawn(Integer.parseInt(identityID));
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(pawn);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
}
