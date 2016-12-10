package com.edo.dolphin.util;

import java.lang.reflect.Proxy;
import java.util.Properties;

import org.apache.ws.security.handler.WSHandlerConstants;
import org.codehaus.xfire.XFireFactory;
import org.codehaus.xfire.client.Client;
import org.codehaus.xfire.client.XFireProxy;
import org.codehaus.xfire.client.XFireProxyFactory;
import org.codehaus.xfire.security.wss4j.WSS4JOutHandler;
import org.codehaus.xfire.service.Service;
import org.codehaus.xfire.service.binding.ObjectServiceFactory;
import org.codehaus.xfire.util.dom.DOMOutHandler;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.edo.dolphin.model.DolphinResult;

public class WebserviceClientTest {
    private WSS4JOutHandler wsOut;
    private Service srvcModel;
    private Client client;
    public String testClient()  {
        srvcModel = new ObjectServiceFactory().create(AppQueryService.class);
        XFireProxyFactory factory = new XFireProxyFactory(XFireFactory
                .newInstance().getXFire());
        String URL = "http://43.254.149.55:8787/dolphin/serviceEnc";
//      URL = "http://localhost:8080/dolphin/serviceEnc";
    
        try {
            AppQueryService srvc = (AppQueryService) factory.create(srvcModel, URL);
            client = ((XFireProxy) Proxy.getInvocationHandler(srvc))
                    .getClient();
            Properties properties = new Properties();
            properties.setProperty(WSHandlerConstants.USER, "ws_security");
            
            properties.setProperty(WSHandlerConstants.ACTION, WSHandlerConstants.ENCRYPT);
            properties.setProperty(WSHandlerConstants.ENC_PROP_FILE,"com/edo/dolphin/util/outsecurity_enc.properties");
            
            String xm = "王轶贤";
            String zjhm = "31022919840724043X";
            String uname = "testAdmin";
            String password = "testPwd";
            
            wsOut = new WSS4JOutHandler(properties);
            client.addOutHandler(new DOMOutHandler());
            client.addOutHandler(wsOut);
            String licenseFile="15033333333";
            String[] param=new String[]{"123"};
            String res = srvc.queryZrrKxHonest(xm, zjhm, uname, password, param,licenseFile);
            System.out.println(res);
            client.close();
            return res;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public static void main(String args[]) {
        try {
            DolphinResult result = new DolphinResult();
            
            WebserviceClientTest t = new WebserviceClientTest();
            
            String data =t.testClient();

            Document document = DocumentHelper.parseText(data);
            Element root = document.getRootElement();
            result.setName(root.attributeValue("name"));
            result.setIdNumber(root.attributeValue("zjhm"));
            result.setSearchNo(root.attributeValue("cxbh"));
            Element resultElement = root.element("RESULT");
            result.setResult(resultElement.getText());
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
