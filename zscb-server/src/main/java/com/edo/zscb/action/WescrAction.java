package com.edo.zscb.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edo.zscb.service.WescrService;
import com.iidooo.core.enums.ResponseStatus;
import com.iidooo.core.model.ResponseResult;

@Controller
public class WescrAction {
    private static final Logger logger = Logger.getLogger(WescrAction.class);
    
    @Autowired
    private WescrService wescrService;
    
    @ResponseBody
    @RequestMapping(value = { "/wescr/getPersonBadInfo" }, method = RequestMethod.POST)
    public ResponseResult getPersonBadInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
//            String id = request.getParameter("id");
//            
//            result.checkFieldRequired("id", id);
//            
//            if (result.getMessages().size() > 0) {
//                result.setStatus(ResponseStatus.Failed.getCode());
//                return result;
//            }
            
            
            String name = "何家俊";
            String idNumber = "440181198810260616";
            String data = wescrService.getPersonBadInfo(name, idNumber);
                       
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(data);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
}
