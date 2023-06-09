import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GrWorkshop } from 'react-icons/gr';
import { MdOutlineCases } from 'react-icons/md';

const Aside = () => {
    const router = useRouter();
    const [path, setPath] = useState('');
    useEffect(() => {
        setPath(router.pathname);

    }, [router])
    return (
        <>
            <div className="aside_logo">
                <img src="/logoBlack.png" />
            </div>
            <div className="aside_list_menu">
                <div className={path === '/recent-work' ? 'aside_list active' : 'aside_list'}>
                    <span className="one"></span>
                    <Link href="/recent-work" className="link">
                        <span> <GrWorkshop /> </span> <span>Recent Work</span>
                    </Link>
                    <span className="two"></span>
                </div>
                <div className={path.includes('/case-studie') ? 'aside_list active' : 'aside_list'}
                >
                    <span className="one"></span>
                    <Link href="/case-studie" className="link">
                        <span> <MdOutlineCases /> </span> <span>Case Studies</span>
                    </Link>
                    <span className="two"></span>
                </div>
            </div>
        </>
    );
};

export default Aside;
