package com.edo.zscb.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edo.zscb.model.vo.BigDAccount;
import com.edo.zscb.model.vo.BigDOrder;
import com.edo.zscb.model.vo.BigDOrderList;
import com.edo.zscb.model.vo.SearchCondition;
import com.edo.zscb.service.BigDService;
import com.iidooo.core.enums.ResponseStatus;
import com.iidooo.core.model.Page;
import com.iidooo.core.model.ResponseResult;

@Controller
public class BigDAction {

    private static final Logger logger = Logger.getLogger(BigDAction.class);

    @Autowired
    private BigDService bigDService;

    @ResponseBody
    @RequestMapping(value = { "/bigd/getAccountInfo" }, method = RequestMethod.POST)
    public ResponseResult getAccountInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {

            BigDAccount bigDAccount = bigDService.getAccount();
            // 返回找到的内容对象
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(bigDAccount);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bigd/getOrderList" }, method = RequestMethod.POST)
    public ResponseResult getOrderList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String currentPage = request.getParameter("currentPage");
            String pageSize = request.getParameter("pageSize");
            String startTime = request.getParameter("startCompleteTime");
            String endTime = request.getParameter("endCompleteTime");
            
            if (StringUtils.isEmpty(currentPage)) {
                currentPage = "1";
            }
            
            if (StringUtils.isEmpty(pageSize)) {
                pageSize = "100";
            }
            
            BigDOrderList bigDOrderList = bigDService.getOrderList(currentPage, pageSize, startTime, endTime);
            
            Page page = new Page();
            page.setCurrentPage(bigDOrderList.getPage());
            page.setPageSize(bigDOrderList.getPer_page());
            page.setRecordSum(bigDOrderList.getTotal());
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("page", page);
            data.put("orderList", bigDOrderList.getOrders());
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(data);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    @ResponseBody
    @RequestMapping(value = { "/bigd/getOrder" }, method = RequestMethod.POST)
    public ResponseResult getOrder(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String id = request.getParameter("id");
            
            result.checkFieldRequired("id", id);
            
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }
            
            BigDOrder bigDOrder = bigDService.getOrder(Integer.parseInt(id));
                       
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(bigDOrder);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bigd/createNewOrder" }, method = RequestMethod.POST)
    public ResponseResult createNewOrder(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String telephone = request.getParameter("telephone");
            String idNumber = request.getParameter("idNumber");
            String name = request.getParameter("name");
            String field = request.getParameter("field");
            
            SearchCondition condition = new SearchCondition();
            condition.setIdNumber(idNumber);
            condition.setTelephone(telephone);
            condition.setName(name);
            condition.setField(field);
            
            BigDOrder bigDOrder = bigDService.createOrder(condition);
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(bigDOrder);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
}
