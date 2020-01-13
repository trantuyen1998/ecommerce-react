import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';


import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles';
import CurrentUserContext from '../../context/current-user/current-user.context';
import { CartContext } from '../../context/cart/cart.provider';


const Header = () => {
    const currentUser = useContext(CurrentUserContext);
    const { hidden } = useContext(CartContext);
    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>SHOP</OptionLink>
                <OptionLink to='/shop'>CONTACT</OptionLink>
                {
                    currentUser ?
                        <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
                        :
                        <OptionLink to='/signin'>SIGN IN</OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {hidden ? null : <CartDropDown />}
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
