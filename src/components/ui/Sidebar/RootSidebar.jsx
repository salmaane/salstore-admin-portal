import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { tokens } from '../../../styles/theme';
import { Box, useTheme, IconButton } from '@mui/material';
// Assets
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// components
import Separator from './Separator';
import Item from './Item'


function RootSidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor={colors.gray[100]}
      rootStyles={{
        boxShadow: '6px 0 10px -8px rgba(0,0,0,0.1)',
        width: '272px',
        height: '100vh',
       }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
              return {
                backgroundColor: active ? colors.darkWhite[500] : undefined,
                '&:hover': {
                  color: colors.indigo[500],
                  backgroundColor: colors.darkWhite[500],
                }
              };
          },
        }}
      >
        {collapsed &&
         <MenuItem 
          icon={<MenuOutlinedIcon/>} 
          onClick={()=>setCollapsed(!collapsed)} 
          rootStyles={{
            display:'flex',
            alignItems:'center',
            py:1, 
            height:'4rem'
          }}
         />
        }
        {!collapsed && 
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            p: 1,
            height:'4rem'
          }}>
            <Box >
              <img src='assets/logo/logo2.png' alt="logo" width={120} />
            </Box>
            <IconButton onClick={()=>setCollapsed(!collapsed)}>
              <MenuOutlinedIcon sx={{ fontSize: '1.7rem' }} color='action' />
            </IconButton>
          </Box>
        }
        <Item
          title="Dashboard"
          icon={<HomeOutlinedIcon/>}
          to='/'
          selected={selected}
          setSelected={setSelected}
        />
        <Separator title="General" collapsed={collapsed} color={colors.darkWhite[700]} />
        <SubMenu 
          icon={<ShoppingBagOutlinedIcon/>}
          label="Products" rootStyles={{ fontSize:'15px' }}
        >
          <Item title='Products List' to='products'/>
          <Item title='Add Product' />
        </SubMenu>
        <Item
          title="User Management"
          icon={<PersonOutlineOutlinedIcon/>}
          to='user-management'
          selected={selected}
          setSelected={setSelected}
        />
      </Menu>
    </Sidebar>
  )
}

export default RootSidebar