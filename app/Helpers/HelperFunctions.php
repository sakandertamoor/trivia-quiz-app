<?php
if (!function_exists('getAssetUrl')) {
    /**
     * @param $env
     * @return mixed
     */
    function getAssetUrl() {
        if(app()->isLocal()){
            return substr(asset('/'),0,strlen(asset('/'))-1) ;
        }
        return asset('/public');;
    }//end function
}//end if

if (!function_exists('reactAsset')) {
    /**
     * @param $env
     * @return mixed
     */
    function reactAsset($assetPath) {
        
        return getAssetUrl()."/$assetPath";
    }//end function
}//end if