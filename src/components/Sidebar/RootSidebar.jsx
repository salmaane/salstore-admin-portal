import { tokens } from '../../styles/theme';
import { useLocation } from 'react-router-dom';
// Assets
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
// components
import { Box, useTheme, IconButton } from '@mui/material';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Separator from './Separator';
import Item from './Item'


function RootSidebar({collapsed, setCollapsed }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const location = useLocation();
  let selected = location.pathname.split('/').filter(path => path !== '').join('/');
  if(!selected) selected = '/';

  return (
    <Sidebar
      breakPoint='lg'
      collapsed={collapsed}
      backgroundColor={colors.gray[100]}
      rootStyles={({toggled}) => ({
        boxShadow: '6px 0 10px -8px rgba(0,0,0,0.1)',
        width: '272px',
        height: '100vh',
        position:'sticky',
        left:0,
        top:0,
        zIndex:10,
       })}
    >
      <Menu
        closeOnClick
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
              <img src='/assets/logo/logo2.png' alt="logo" width={120} />
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
        />
        <Separator title="General" collapsed={collapsed} color={colors.darkWhite[700]} />
        <SubMenu 
          icon={<ShoppingBagOutlinedIcon/>}
          label="Products" rootStyles={{ fontSize:'15px' }}
          defaultOpen={true}
        >
          <Item 
            title='Products List'
            to='products' 
            icon={<FiberManualRecordIcon sx={{ fontSize: '10px' }} />}
            selected={selected}
          />
          <Item 
            title='Add Product' 
            to='products/add-product' 
            icon={<FiberManualRecordIcon sx={{ fontSize:'10px' }} />} 
            selected={selected}
          />
        </SubMenu>
        <Item
          title="Orders"
          icon={<LoyaltyOutlinedIcon/>}
          to='orders'
          selected={selected}
        />
        <Item
          title="User Management"
          icon={<PersonOutlineOutlinedIcon/>}
          to='user-management'
          selected={selected}
        />
      </Menu>
    </Sidebar>
  )
}

export default RootSidebar