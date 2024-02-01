'use client'
import Image from 'next/image'
import { Logo } from '../Logo/Logo'
import { Avatar, Button } from '..'
import { Input } from '../Input/Input'
import { useEffect, useState } from 'react'
import { ArrowDropDown, CancelOutlined, Close, Search } from '@mui/icons-material'
import { Montserrat } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import { useGeoLocation } from '@/hooks'
import { Autocomplete, Menu, Modal, Tab, Tabs } from '@mui/material'
import { estadosArray, getCidadesByUF } from '@/utils'
import { Cache } from '@/adapters'
import { LoginAndRegister } from '../LoginAndRegister'
import { useRegister } from '@/shared/hooks/useRegister'
import { LegacyAvatar } from '../Avatar/legacy/Avatar/Avatar'
import { useSearch } from '@/shared/hooks/useSearch'
import { AvatarWithTabs } from '../AvatarWithTabs/AvatarWithTabs'

const fontMontSerrat = Montserrat({ subsets: ['latin'] })

export function Navbar() {

  const [value, setValue] = useState('')
  const router = useRouter()

  const { handleSearchEvents, handleClearSearchEvents, location, setLocation } = useSearch()

  // const {location, setLocation} = useGeoLocation()

  const [anchorEl, setAnchorEl] = useState<any>(null)

  const [locationValue, setLocationValue] = useState({city: location?.city, uf: location?.uf})

  const {user, handleLoadUser, clearDefaultValues} = useRegister()
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)

  const [authType, setAuthType] = useState<'login' | 'register'>('login')

  useEffect(() => {
    if((locationValue.city && locationValue.uf) && (locationValue.city !== '' && locationValue.uf !== '') ){
      Cache.set({key: 'location', value: locationValue})
      // TODO Filter events by location
    }
  }, [locationValue])

  async function fetchUser(){
    debugger;
    await handleLoadUser()
  }

  useEffect(() => {
    debugger;
    if(!user)
      fetchUser()
  }
  , [])

  
  const pathName = usePathname()

  useEffect(() => {
    if(value !== ""){
      setValue("")
      handleClearSearchEvents()
    }
  }, [pathName])

  const { handleLogoutUser } = useRegister()
  
  
  return (
    <>
      <nav
        className='flex items-center justify-between w-full md:px-10 px-4 py-6 flex-col md:flex-row gap-8 border-b-2 border-gray'
      >
        <div
          className='flex items-center justify-between w-full md:w-2/5'
        >
            <Image
              className='absolute left-0 top-0 z-[-1] opacity-10 rotate-[-2deg] md:max-w-[26rem] sm:max-w-full overflow-hidden'
              src={'/LogoBackground.svg'}
              alt="Logo"
              width={410}
              height={55}
              priority={true}
              />
            <div
              className='flex items-center gap-4 relative'
            >
              <Logo
                onClick={() => router.push('/')}
              />
              <div>
                <p
                  className={fontMontSerrat.className + 'text-sm text-textPrimary font-bold'}
                >Comprou,</p>
                <p
                  className={fontMontSerrat.className + 'text-sm text-textPrimary font-bold'}>
                    sorriu, curtiu.
                  </p>
              </div>
            </div>
            <div
              className='md:hidden flex items-center gap-4 relative'
            > 
            {user?.imagem ? 
              <LegacyAvatar
                image={user?.imagem}
                username={user?.nome}
                variant='small-two'
                onClick={() => setProfileModalOpen(true)}
              />
                : <Avatar
                  className='cursor-pointer'
                  onClick={() => setProfileModalOpen(true)}
                />
            }
            </div>
        </div>
        <div
          className='flex items-center justify-between w-full md:w-3/5 flex-col md:flex-row gap-4 '>
            <div
              className='flex items-center gap-2 relative'
            >
              <Image
                src={'/Localization.svg'}
                alt="Logo"
                width={30}
                height={30}
              />
              <div>
                <p
                  className='text-sm text-primary font-medium'
                >Eventos próximos à</p>
                <div
                  className='text-textPrimary font-medium w-48 flex items-center gap-0'>
                    <div className='text-textPrimary font-medium relative max-w-40 min-w-40 text-ellipsis flex items-center'>
                      <p
                        className='max-w-32 overflow-hidden text-ellipsis whitespace-nowrap inline-block h-fit'
                      >
                      {(locationValue.city !== null && locationValue.city !== undefined && locationValue.city !== '') ? locationValue.city : 'Sua localização'}
                      </p>
                      , {locationValue.uf ? locationValue.uf : 'UF'}
                    </div>
                      {
                        locationValue.city && locationValue.uf && !anchorEl ? <CancelOutlined
                        className='text-primary mb-1 ml-[-8px] cursor-pointer'
                        onClick={() => {
                          setLocationValue({city: '', uf: ''})
                          setLocation({city: '', uf: ''})
                          Cache.remove({key: 'location'})
                        }}
                      />
                        :   <ArrowDropDown
                        className='text-primary mb-1 ml-[-8px] cursor-pointer'
                        onClick={e => setAnchorEl(e.currentTarget)}
                      />
                    }
                  
                    <Menu
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={() => setAnchorEl(null)}
                      onKeyDown={(e) => {
                        if(locationValue.city && locationValue.uf){
                          if(e.key === 'Escape' || e.key === 'Enter'){
                            setAnchorEl(null)
                          }
                        }
                      }                      }
                      sx={{
                        marginLeft: '-10rem',
                        '.MuiMenu-paper': {
                          width: '26rem',
                          height: '50rem',
                          borderRadius: '1rem',
                          backgroundColor: '#FFFFFF00',
                          borderColor: '#FFFFFF00',
                          boxShadow: 'none',
                        },
                        '@media (max-width: 768px)': {
                          marginLeft: '0rem',
                        }
                      }}
                      onClick={() => setAnchorEl(null)}
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className='flex items-center min-w-[26rem] max-w-[26rem] h-28 bg-background rounded-lg justify-between'
                      >

                        <div
                          className='flex  items-center absolute z-[9999] justify-between p-2 md:p-4'>
                          <div
                            className='flex flex-col justify-between gap-2 md:p-4'
                          >
                            <p
                              className='text-primary font-medium'
                            >UF</p>
                            <Autocomplete
                              disablePortal
                              // disable clearable
                              // clearIcon={null}
                              value={estadosArray.find(estado => estado.sigla === locationValue.uf)}
                              options={estadosArray}
                              getOptionLabel={(option) => option.sigla}
                              onChange={(e:any, newValue: any) => {
                                if(!newValue){
                                  setLocationValue({city: '', uf: ''}) 
                                  setLocation({city: '', uf: ''})
                                  Cache.remove({key: 'location'})
                                  return
                                }
                                setLocationValue({city: '', uf: newValue.sigla}) 
                                setLocation({city: '', uf: newValue.sigla})
                              }}
                              sx={{ width: '7rem', position: 'relative', zIndex: 9999, // Adicione zIndex aqui
                              '& .MuiAutocomplete-popper': { zIndex: 9999 } // Adicione zIndex para o popper
                              }}
                              renderInput={(params) => <Input {...params} sx={{width: '7rem'}} variant='outlined' />}
                            />
                          </div>
                          <div
                            className='flex flex-col gap-2 p-4'
                          >
                            <p
                              className='text-primary font-medium whitespace-nowrap w-fit'
                            >Selecione sua cidade</p>
                            <Autocomplete
                              disablePortal
                              value={locationValue.city}
                              disabled={!locationValue.uf || locationValue.uf === ''}
                              options={getCidadesByUF(locationValue.uf)}
                              onChange={(e:any, newValue: any) => {
                                setLocationValue({city: newValue, uf: locationValue.uf}) as any
                                setLocation({city: newValue, uf: locationValue.uf}) as any
                              }}
                              sx={{ width: '4rem', position: 'relative', zIndex: 9999, // Adicione zIndex aqui
                              '& .MuiAutocomplete-popper': { zIndex: 9999 } // Adicione zIndex para o popper
                              }}
                              renderInput={(params) => <Input {...params} sx={{width: '12rem'}} variant='outlined' />}
                            />
                          </div>
                          <div
                            className='flex items-center justify-center mt-6 ml-6 gap-4 p-1 bg-primary rounded-lg'
                            style={{
                              backgroundColor: locationValue.city && locationValue.uf ? '#8779F8' : '#bcbcbc'
                            }}
                          >
                            <Search
                              className='cursor-pointer text-background h-full flex items-center justify-center text-lg self-center'
                              onClick={() => {
                                  if(locationValue.city && locationValue.uf){
                                    setAnchorEl(null)
                                  }
                                }
                              }
                              style={{
                                color: locationValue.city && locationValue.uf ?  '#fff'  : '#fcfcfc'
                              }}
                              />
                          </div>
                        </div>
                        
                      </div>

                    </Menu>
                </div>
              </div>
            </div>
            <div
              className='w-full md:w-3/5'
            >
              <Input
                variant='outlined'
                placeholder='Pesquisar eventos'
                className='w-full text-primary'
                resetButton
                value={value}
                lefticon={<Search
                  className="cursor-pointer"
                  onClick={() => handleSearchEvents(value)}
                />}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => {
                  if(e.key === 'Enter'){
                    handleSearchEvents(value)
                  }
                }}
                onCancelClick={() => {
                  handleClearSearchEvents()
                }}
                />
            </div>
            <div
              className='hidden items-center w-fit gap-4 md:flex'
            >
              {
                !user ? <>
                  <Button
                  className='px-8 py-2 !border-gray text-textPrimary'
                  variant='secondary'
                  onClick={() => {
                    setIsAuthModalOpen(true)
                    setAuthType('login')
                  }}
                  >Entrar</Button>
                  <Button
                    onClick={() => {
                      setIsAuthModalOpen(true)
                      setAuthType('register')
                    }}
                  >Criar conta</Button>
                </>
                : <>
                  <Button
                    onClick={() => {
                      router.push('/meus-ingressos')
                    }}
                  >Meus Ingressos</Button>
                  <div
                    className='w-12 h-fit cursor-pointer'
                    onClick={() => {
                      router.push('/profile')
                    }}
                  >
                    {user?.imagem ? 
                    <LegacyAvatar
                      image={user?.imagem}
                      username={user?.nome}
                      variant='small-two'
                      onClick={() => setProfileModalOpen(true)}
                    />
                      : <Avatar
                        className='cursor-pointer'
                        onClick={() => setProfileModalOpen(true)}
                      />
                  }
                  </div>
                </>
                }
            </div>
          </div>
      </nav>
      <Modal
        open={isAuthModalOpen}
        onClose={() => {
          clearDefaultValues()
          setIsAuthModalOpen(false)
        }}
      >
        <div
          className='flex items-center justify-center w-full h-full'
        >
         {
         isAuthModalOpen && <div
            className='bg-white md:bg-[#00000000] w-full h-full overflow-y-auto md:overflow-hidden md:h-fit md:w-fit p-4 md:rounded-lg relative'
          >
            <LoginAndRegister
              type={authType}
              onClose={() => setIsAuthModalOpen(false)}
              handleChangeType={(type) => setAuthType(type)}
              onClickPurchase={() => {
                debugger;
                setIsAuthModalOpen(false)
                handleLoadUser()
                // router.push('/checkout')
              }}
            />
            <Close
              className='absolute top-2 right-4 md:top-[15%] md:right-[8%] cursor-pointer z-10 text-gray'
              onClick={() => {
                debugger;
                setIsAuthModalOpen(false)
                clearDefaultValues()
              }} 
            />
          </div>
          }
        </div>
      </Modal>
      
      <Modal
        open={profileModalOpen}
        onClose={() => {
          setProfileModalOpen(false)
        }}
      >
        
        <div
          className='flex items-center flex-col p-4 w-full h-full bg-background'
        >
          
        <div
          className='flex items-center justify-between w-full relative md:w-2/5'
        >
            <Image
              className='absolute left-0 top-0 z-[-1] opacity-10 rotate-[-2deg] md:max-w-[26rem] sm:max-w-full overflow-hidden'
              src={'/LogoBackground.svg'}
              alt="Logo"
              width={410}
              height={55}
              priority={true}
              />
            <div
              className='flex items-center gap-4 relative'
            >
              <Logo
                onClick={() => router.push('/')}
              />
              <div>
                <p
                  className={fontMontSerrat.className + 'text-sm text-textPrimary font-bold'}
                >Comprou,</p>
                <p
                  className={fontMontSerrat.className + 'text-sm text-textPrimary font-bold'}>
                    sorriu, curtiu.
                  </p>
              </div>
            </div>
            <Close
              className='absolute top-2 right-4 md:top-[15%] md:right-[8%] cursor-pointer z-10 text-gray'
              onClick={() => setProfileModalOpen(false)}
            />
        </div>

        {
          user ? <div
            className='flex flex-col w-full items-start mt-8 gap-4 relative'
          >
            <div
              className='flex items-center gap-4 relative'
            >
              <div
                className='flex flex-col items-center gap-4 relative'
              > 
              {user?.imagem ? 
                <LegacyAvatar
                  image={user?.imagem}
                  username={user?.nome}
                  variant='medium'
                  onClick={() => setProfileModalOpen(true)}
                />
                  : <Avatar
                    className='cursor-pointer'
                    onClick={() => setProfileModalOpen(true)}
                  />
              }
              </div>
              <div
                className='flex flex-col gap-2'
              >
                <p
                  className='text-textPrimary font-medium'
                >Olá, {user?.nome?.split(" ")[0]}</p>
              </div>
            </div>
         
      <Tabs
        orientation="vertical"
        className="mt-2"
        value={
          pathName === '/meus-ingressos' ? 0 : 
          pathName === '/profile' ? 1 : 0
        }
        onChange={(event, tab) => {
          if(tab === 0){
            router.push('/meus-ingressos')
            setProfileModalOpen(false)
          } else if(tab === 1){
            router.push('/profile')
            setProfileModalOpen(false)
          }
        }}
      >
        <Tab
          value={0}
          icon={
            <Image
              src={"/ticket-black.svg"}
              alt="Ticket Icon"
              width={24}
              height={24}
            />
          }
          iconPosition="start"
          label="Meus Ingressos"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
            justifyContent: "start",
          }}
        />
        <Tab
          value={1}
          icon={
            <Image
              src={"/profile.svg"}
              alt="Ticket Icon"
              width={24}
              height={24}
            />
          }
          iconPosition="start"
          label="Meu Perfil"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
            justifyContent: "start",
          }}
        />
        <Tab
          value={2}
          icon={
            <Image
              src={"/logout.svg"}
              alt="Ticket Icon"
              width={24}
              height={24}
            />
          }
          iconPosition="start"
          onClick={handleLogoutUser}
          label="Sair"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
            justifyContent: "start",
          }}
        />
      </Tabs>
          </div>
          : <div
            className='flex flex-col mt-8 items-center justify-center gap-4'
          >
            <Button
              className='px-8 py-2 !border-gray text-textPrimary'
              variant='secondary'
              onClick={() => {
                setIsAuthModalOpen(true)
                setAuthType('login')
                setProfileModalOpen(false)
              }}
              >Entrar</Button>
            <Button
              onClick={() => {
                setIsAuthModalOpen(true)
                setAuthType('register')
                setProfileModalOpen(false)
              }}
            >Criar conta</Button>
          </div>
        }
          
        </div>
      
      </Modal>
    </>

  )
}