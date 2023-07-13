// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./nft.sol" ;
import "./vrf.sol" ;

contract bonus_token is ERC20("AToken", "AT") , Ownable {

    NFT_c nft_contract ;
    VRFv2Consumer v_c = VRFv2Consumer( 0x8acbDe6A8F4a9fC9B95509bcb8EcA1da5a83ae65 ) ;
    uint price = 0 ;

    // OVERRIDE & REDEFINED FUNCTIONS
    function decimals() override public pure returns( uint8 ){
        return 0 ;
    }

    function setprice( uint _n ) public onlyOwner() {
        price = _n ;
    }

    function set_n_c( address add ) public onlyOwner(){
        nft_contract = NFT_c( add ) ;
    }

    function t_mint( address _to ) public { // 사용 확인되면 토큰 1개 지급
        require( msg.sender == address( nft_contract ) ) ;
        _mint( _to , 1 ) ;
    }

    event Raffle( uint indexed _idx , address indexed _add ) ;
    event Auction( uint indexed _idx , address indexed _add , uint _bid ) ;

    function Raffle_participate( uint _n ) public {

        // 참여조건 토큰 1개 보유
        // 토큰 1개 내야함
        // burn( msg.sender , price ) ;
        emit Raffle( _n , msg.sender ) ;
        
    }

    function Auction_participate( uint _n , uint _bid ) public {

        // 참여조건 토큰 1개 보유
        // 토큰 1개 내야함
        if( price > 0 ){
        burn( msg.sender , price ) ;
        }
        emit Auction( _n , msg.sender , _bid ) ;
        
    }

    function Raffle_End( uint _n , uint num ) public view returns( uint ) {//onlyOwner() returns( uint ) {
        uint r = v_c.getR() % num ;
        return r ;
    }

    function burn( address sender , uint256 amount) internal {
        _burn( sender , amount) ;
    }

}