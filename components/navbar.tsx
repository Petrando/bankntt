import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/components/Navbar.module.css";
import { ArrowDropDown } from "@material-ui/icons";

interface IconStrokeI {
  stroke: string;
}

const MenuIcon: FC<IconStrokeI> = ({ stroke }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66663 9.33334H25.3333"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66663 16H25.3333"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66663 22.6667H25.3333"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CloseIcon: FC<IconStrokeI> = ({ stroke }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      stroke={stroke}
    >
      <path
        d="M8 8L24 24"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 8L8 24"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface NavIconI {
  showNavMenu: boolean;
  navbarOnTop: boolean;
  darkMenuColor: boolean;
}

const NavIcon: FC<NavIconI> = ({ showNavMenu, navbarOnTop, darkMenuColor }) => {
  
  return (
    <>
      {showNavMenu ? (
        <CloseIcon stroke={"#FFFFFF"} />
      ) : (
        <MenuIcon stroke={darkMenuColor?"#636363":"#FFFFFF"} />
      )}
    </>
  );
};

const NavMenuList = [         
  { label: "Produk & Layanan", to: "#", asPathBreadcrumb:"/produk/",
    subMenu : [
      {
        label:"Dana", to:"/produk/dana", subMenu : [
          {label:"Tabungan", to:"/produk/dana/gallery-tabungan", asPathBreadcrumb:"/produk/dana/tabungan"},
          {label:"Deposito", to:"#"},
          {label:"Giro", to:"#"},
          {label:"Anjungan Tunai Mandiri (ATM)", to:"#"},
          {label:"Electronic Data Capture (EDC)", to:"#"},
          {label:"SMS Banking & Mobile Banking", to:"#"},                  
        ]
      },
      {
        label:"Kredit", to:"#", subMenu : [
          {label:"UPL Mikro", to:"#"},
          {label:"Garansi Bank", to:"#"},
          {label:"Kredit Multi Usaha", to:"#"},
          {label:"Kredit Multi Guna", to:"#"},
          {label:"Kredit Komersil Umum", to:"#"},
          {label:"Kredit Properti", to:"#"},
          {label:"Kredit Pegawai Vertikal", to:"#"},
        ]
      },              
      {label:"Suku Bunga Dasar Kredit", to:"#"},
      {label:"Laku Pandai Bank NTT", to:"#"}
    ]
  },
  { label: "Layanan 24 Jam", to: "#", subMenu:[
    {label:"ATM", to:"#"},
    {label:"SMS Banking", to:"#"},
    {label:"Mobile Banking", to:"#"},
    {label:"NTT Pay", to:"#"},
    {label:"Call Center Bank NTT", to:"#"},
    {label:"Whistle Blowing System", to:"#"},
    {label:"Pengaduan Anti Gratifikasi", to:"#"},
  ] },                  
  { label: "Tentang Kami", to: "#", subMenu:[
    {label:"Sejarah Singkat", to:"#"},
    {label:"Visi & Misi", to:"#"},
    {label:"Direksi & Struktur Organisasi", to:"#"},
    {label:"Dewan Komisaris", to:"#"},
    {label:"Kontak Kami", to:"#", subMenu:[
      {label:"Pengunguman", to:"#"},
      {label:"Press Release", to:"#"}
    ]},
    {label:"Majalah Internal", to:"#"},
    {label:"CSR", to:"#", subMenu:[
      {label:"Tahun Buku 2015", to:"#"},
      {label:"Tahun Buku 2016", to:"#"},
      {label:"Tahun Buku 2017", to:"#"},
      {label:"Tahun Buku 2018", to:"#"},
      {label:"Tahun Buku 2019", to:"#"}
    ]},
    {label:"Daftar Pemegang Saham", to:"#"}
  ]},
  { label: "Jaringan Kantor", to: "#" },
  { label: "Info Lowongan", to: "#" }, 
  { label: "Laporan Publikasi", to: "#", subMenu: [
    {label:"Neraca Publikasi", to:"#"},
    {label:"Good Corporate Governance", to:"#"},
    {label:"Laporan Tahunan", to:"#"},
    {label:"Laporan Rasio Pengungkit", to:"#"}
  ]}
]

const brightTopPages = [
  "/produk/dana/gallery-tabungan"
]

const brightTopPages_dinamicUrl = [
  "/produk/dana/tabungan/"
]

const Navbar: FC = () => {
  const [showNavMenu, setShowNavMenu] = useState<boolean>(false);
  const [navbarOnTop, setNavbarOnTop] = useState<boolean>(true);
  const [isMidScreensize, setIsMidScreensize] = useState<boolean>(false);
  const [currentHover, setCurrentHover] = useState<string>("");  
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    listenToScroll();
    listenToResize();
    window.addEventListener("resize", listenToResize);
    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
      window.removeEventListener("resize", listenToResize);
    };
  }, []);

  const listenToScroll = () => {
    setNavbarOnTop(window.pageYOffset === 0);
    if(currentHover!==""){
      setCurrentHover("");
    }
  };

  const listenToResize = () => {    
    const screenWidth = window.innerWidth > 0?window.innerWidth:screen.width;    
    setIsMidScreensize(screenWidth <= 950);    
  };

  const NavButton = () => (
    <div
      className={styles.navButton}
      onClick={() => {
        setShowNavMenu(!showNavMenu);
        setCurrentHover("");
      }}
    >
      <NavIcon
        showNavMenu={showNavMenu}
        navbarOnTop={navbarOnTop}
        darkMenuColor={darkMenuColor()}
      />
    </div>
  );

  const isBrightTop_dynamicUrl = () => {
    let isBrightTop = false;
    
    for(let i=0; i < brightTopPages_dinamicUrl.length; i++){
      if(asPath.startsWith(brightTopPages_dinamicUrl[i])){
        isBrightTop = true;
        break;
      }      
    }

    return isBrightTop;
  }

  const darkMenuColor = () => (brightTopPages.includes(asPath) || isBrightTop_dynamicUrl()) && navbarOnTop;

  return (
    <div
      className={`${styles.navbar} ${
        showNavMenu
          ? styles.navbarSmallDevice_menuViewed
          : navbarOnTop
          ? (currentHover===""?styles.navbarTransparent:styles.navbarScrolled)
          : styles.navbarScrolled
      }`}             
    >
      <div className={"navbarMenu"}>
        {NavMenuList.map((d, i) => (
          <NavItem key={i} {...d} 
                   darkMenuColor={darkMenuColor()}  
                   isMidScreensize={isMidScreensize}
                   currentHover={currentHover} 
                   setCurrentHover={setCurrentHover}    
                   asPath={asPath}           
          />
        ))}
      </div>
      <Link href="/">
        <a className={styles.navbarLogo}
          onMouseOver={()=>{setCurrentHover("");}}
        >
          <Image
            src={`/images/logo_rev.png`}
            width={126}
            height={80}
            alt={"Navbar Logo"}
          />
        </a>
      </Link>
      {NavButton()}
      <style jsx>{`
        .navbarMenu {
          position: absolute;
          width: 87%;
          right: 0px;
          height: 100px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 950px) {
          .navbarMenu {
            width: 100vw;
            min-height: calc(100vh - 100px);
            height: auto !important;
            flex-direction: column;
            justify-content: center;
            left: 0px;
            top: 100px;
            margin-top: 0px;
            background-color: rgba(0, 0, 0, 0.77);
            opacity: ${showNavMenu ? 1 : 0};
            pointer-events: ${showNavMenu ? "auto" : "none"};
            overflow: hidden;
            transition: opacity 0.5s;            
          }
        }                
      `}</style>
    </div>
  );
};

interface NavSubMenu {
  label: string;
  to: string;
  subMenu?: NavSubMenu[];
}

interface NavItemI {
  label: string;
  to: string;
  asPathBreadcrumb?:string;
  darkMenuColor:boolean;
  subMenu?:NavSubMenu[];
  isMidScreensize: boolean;
  currentHover:string;
  setCurrentHover:Dispatch<SetStateAction<String>>;
  asPath:string;
}

const NavItem: FC<NavItemI> = ({ label, 
                                 to, 
                                 asPathBreadcrumb,
                                 darkMenuColor, 
                                 asPath, 
                                 isMidScreensize, 
                                 currentHover, 
                                 setCurrentHover, 
                                 subMenu }) => {

  const iAmHovered = label === currentHover && typeof subMenu !== "undefined";  

  const mySubSubMenu = (subSubMenu) => {    
    return (
      <div className={styles.navbarSubSubMenu}>
        {
              subSubMenu.map((d, i) => {
                return (
                <Link href={d.to} key={i}>
                  <span
                    className={`
                                ${styles.subMenuItem} 
                                ${asPath === d.to && styles.atMenu}
                                ${
                                  d.asPathBreadcrumb && 
                                  asPath.startsWith(d.asPathBreadcrumb) && 
                                  styles.isAtMenuParent
                                }
                                ${d.to==="#" && "inactiveButton"}
                              `}                           
                  >
                    {d.label}                        
                  </span>
                </Link>
              )})
            } 
      </div>
    )
  }

  const mySubMenu = () => {            
      return (
          <div className={`${styles.navbarSubMenu}`}>
            {
              subMenu.map((d, i) => {
                return (
                <Link href={d.to} key={i}>
                  <span
                    className={`
                                ${styles.subMenuItem} 
                                ${asPath === d.to && styles.atMenu}
                                ${asPath.startsWith(d.to) && styles.isAtMenuParent}
                                ${d.to==="#" && !d.subMenu && "inactiveButton"}
                              `}                           
                  >
                    {
                      !isMidScreensize && d.subMenu?
                      labelChevron(d.label, false):
                      <>
                        {d.label}
                      </>
                    }   
                    {
                      !isMidScreensize &&
                      d.subMenu &&
                      mySubSubMenu(d.subMenu)
                    }     
                  </span>
                </Link>
              )})
            }                
          </div>
      )
  }

  const labelChevron = (label:string, isSubMenu:boolean) => {
    return (
      <>
        <p className={`${styles.menuLabel} ${!isSubMenu && styles.menuLabelLeft}`}>
          {label}
        </p>
        <span className={`${styles.menuChevron} ${"centerRowFlex"}`}>
          <ArrowDropDown/>
        </span>
      </>
    )
  }
  
  const mySubMenu_mobile = () => {      
      return (
          <div className={"navbarSubMenu"}            
          >
            {
              subMenu.map((d, i) => (
                <Link href={d.to} key={i}>
                  <span
                    className={`
                                ${styles.subMenuItem}
                                ${asPath === d.to && styles.atMenu}
                                ${asPath.startsWith(d.to) && styles.isAtMenuParent}
                                ${d.to==="#" && "inactiveButton"}
                              `}                           
                  >
                    {d.label}        
                  </span>
                </Link>
              ))
            }           
            <style jsx>
              {
                `
                  .navbarSubMenu {
                    position: absolute;
                    width: 100%;
                    min-height: 20px;
                    left: 12px;
                    top: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: #001a2e;
                  }

                  @media (max-width: 950px){
                    .navbarSubMenu {
                        position: relative;
                        top: 10px;    
                        left: 0px;            
                        background-color: rgba(0, 0, 0, 0.77);                        
                    }                    
                  }
                `
              }
            </style>
          </div>
      )
  }

  return (    
    <Link href={to}>
      <>
      <a
        className={`
                    ${styles.menuItem} 
                    ${darkMenuColor && styles.menuItem_atBrightTopPages}
                    ${asPath === to && styles.atMenu}
                    ${asPath.startsWith(asPathBreadcrumb) && styles.isAtMenuParent}
                  `}        
        onClick={()=>{
          setCurrentHover(typeof subMenu==="undefined"?"":currentHover===label?"":label);
        }}                
      >
        {
           !isMidScreensize && subMenu?
            labelChevron(label, true):
            <>
              {label}
            </>
        }
        {
          !isMidScreensize &&
          subMenu &&
          mySubMenu()
        }
        {
          isMidScreensize &&
          iAmHovered &&
          mySubMenu_mobile()
        }
      </a>
      </>
    </Link>
  );
};

export default Navbar;
