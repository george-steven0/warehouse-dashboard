import {configureStore} from "@reduxjs/toolkit"
import loginSlice from "../Slices/AuthSLice/loginSlice"
import countrySlice from "../Slices/DashboardSlice/Home/countrySlice"
import discountVsUnorderSlice from "../Slices/DashboardSlice/Home/discountVsUnorderSlice"
import latestProductSlice from "../Slices/DashboardSlice/Home/latestProductSlice"
import newReturnedBuyerSlice from "../Slices/DashboardSlice/Home/newReturnedBuyerSlice"
import newUserVsReturnedSlice from "../Slices/DashboardSlice/Home/newUserVsReturnedSlice"
import overViewSlice from "../Slices/DashboardSlice/Home/overViewSlice"
import paidvsunpaidOrderSlice from "../Slices/DashboardSlice/Home/paidvsunpaidOrderSlice"
import todaySlice from "../Slices/DashboardSlice/Home/todaySlice"
import totalProductCategoryPercentSlice from "../Slices/DashboardSlice/Home/totalProductCategoryPercentSlice"
import messageSlice from "../Slices/DashboardSlice/Messages/messageSlice"
import lowInventoryReportSlice from "../Slices/DashboardSlice/Reports/lowInventoryReportSlice"
import newCustomerReportSlice from "../Slices/DashboardSlice/Reports/newCustomerReportSlice"
import salesReportSlice from "../Slices/DashboardSlice/Reports/salesReportSlice"
import topSellingReportSlice from "../Slices/DashboardSlice/Reports/topSellingReportSlice"
import customerSlice from "../Slices/DashboardSlice/Seller/customerSlice"
import failedOrderSlice from "../Slices/DashboardSlice/Seller/failedOrderSlice"
import incomeSlice from "../Slices/DashboardSlice/Seller/incomeSlice"
import reviewSlice from "../Slices/DashboardSlice/Seller/reviewSlice"
import sellerOverviewSlice from "../Slices/DashboardSlice/Seller/sellerOverviewSlice"
import vendorProfileSlice from "../Slices/DashboardSlice/Seller/vendorProfileSlice"
import vendorSellerSlice from "../Slices/DashboardSlice/Seller/vendorSellerSlice"

export const store = configureStore({
    reducer : {
        login : loginSlice,
        overview : overViewSlice,
        today : todaySlice,
        latestProduct : latestProductSlice,
        countryPercent : countrySlice,
        newReturnedBuyer : newReturnedBuyerSlice,
        paidvsunpaid : paidvsunpaidOrderSlice,
        categoryPercent : totalProductCategoryPercentSlice,
        newUserVsReturned : newUserVsReturnedSlice,
        discountVsUnorder : discountVsUnorderSlice,
        topSellingReport : topSellingReportSlice,
        salesReport : salesReportSlice,
        lowInventoryReport : lowInventoryReportSlice,
        newCustomerReport : newCustomerReportSlice,
        sellerOverview : sellerOverviewSlice,
        vendorSeller : vendorSellerSlice,
        messages : messageSlice,
        review : reviewSlice,
        income : incomeSlice,
        customer : customerSlice,
        failedOrder : failedOrderSlice,
        vendorProfile : vendorProfileSlice
    }
})
