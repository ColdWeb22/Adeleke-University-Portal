
import React from 'react';
import {
    CreditCard, FileText, Download, DollarSign,
    PieChart, LayoutGrid, Book, User, Settings,
    Wallet, Building2, Utensils, HeartPulse, LogOut
} from 'lucide-react';

// Interfaces
interface Transaction {
    id: string;
    date: string;
    description: string;
    status: 'Processed' | 'Paid' | 'Pending';
    amount: number;
    icon: React.ElementType;
}

interface CostItem {
    label: string;
    amount: number;
    icon: React.ElementType;
}

// Data
const transactions: Transaction[] = [
    { id: '1', date: 'Sep 01, 2023', description: 'Fall 2023 Tuition', status: 'Processed', amount: 4500.00, icon: Book },
    { id: '2', date: 'Aug 28, 2023', description: 'Housing Fee', status: 'Processed', amount: 3200.00, icon: Building2 },
    { id: '3', date: 'Aug 15, 2023', description: 'Library Fine', status: 'Paid', amount: 15.00, icon: FileText },
];

const costBreakdown: CostItem[] = [
    { label: 'Tuition Fees', amount: 8500.00, icon: Book },
    { label: 'Housing', amount: 3200.00, icon: Building2 },
    { label: 'Meal Plan', amount: 1800.00, icon: Utensils },
    { label: 'Health Insurance', amount: 450.00, icon: HeartPulse },
];

export default function StudentFinancials() {
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-[sans-serif]">

            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white flex flex-col fixed h-full z-10 p-4">
                <div className="bg-gray-50 rounded-xl p-4 mb-8 flex items-center gap-3 border border-gray-200">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="text-sm font-bold">Alex Smith</div>
                        <div className="text-[10px] text-gray-500">ID: 8839201</div>
                    </div>
                </div>

                <nav className="space-y-1">
                    <SidebarItem icon={<LayoutGrid size={18} />} label="Dashboard" />
                    <SidebarItem icon={<Book size={18} />} label="Academics" />
                    <SidebarItem icon={<DollarSign size={18} />} label="Financials" active />
                    <SidebarItem icon={<User size={18} />} label="Profile" />

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <SidebarItem icon={<Settings size={18} />} label="Settings" />
                    </div>
                </nav>

                <button className="mt-auto flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <LogOut size={18} />
                    Log Out
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Financials Overview</h1>
                        <p className="text-gray-600 text-sm">Manage your tuition, payments, and financial aid.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 transition-colors">
                        <Download size={16} />
                        Download Statement
                    </button>
                </div>

                {/* Hero Section */}
                <div className="bg-white border border-gray-200 rounded-3xl p-1 overflow-hidden mb-8 grid grid-cols-1 lg:grid-cols-2">
                    {/* Abstract Visual Side */}
                    <div className="relative bg-gradient-to-br from-red-900/40 to-yellow-900/40 h-64 lg:h-auto rounded-l-[20px] rounded-r-[20px] lg:rounded-r-none overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        {/* Abstract Curves */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <svg viewBox="0 0 400 300" className="w-full h-full opacity-30">
                                <path fill="none" stroke="url(#gradient)" strokeWidth="2" d="M0,200 C150,300 250,0 400,100" />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#dc2626" />
                                        <stop offset="100%" stopColor="#ca8a04" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        <div className="absolute bottom-6 left-6">
                            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs text-gray-900 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                                Payment Due Soon
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Outstanding Balance</span>
                            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded border border-red-200">Due Oct 15, 2023</span>
                        </div>

                        <div className="flex items-end gap-2 mb-8">
                            <h2 className="text-5xl font-bold tracking-tight">₦4,500.00</h2>
                            <span className="text-xl text-gray-500 pb-1.5 font-medium">NGN</span>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-red-700 hover:bg-red-800 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 transition-all">
                                <Wallet size={18} />
                                Pay Balance
                            </button>
                            <button className="px-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-900 rounded-xl font-medium text-sm transition-all">
                                View Breakdown
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Aid & Transactions) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Financial Aid Card */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold">Financial Aid & Costs</h3>
                                    <p className="text-xs text-gray-500">Fall 2023 Semester</p>
                                </div>
                                <button title="Settings" className="text-gray-500 hover:text-gray-900"><Settings size={16} /></button>
                            </div>

                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Aid Applied</div>
                                    <div className="text-2xl font-bold">₦7,000.00</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Total Cost</div>
                                    <div className="text-xl font-medium text-gray-700">₦11,500.00</div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex mb-4">
                                <div className="w-[39%] bg-green-600 h-full"></div> {/* Grant */}
                                <div className="w-[21%] bg-yellow-500 h-full"></div> {/* Loans */}
                                <div className="flex-1 bg-gray-400 h-full"></div> {/* Remaining */}
                            </div>

                            {/* Legend */}
                            <div className="flex gap-6 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                                    <span className="text-gray-700">Grants (₦4,500)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <span className="text-gray-700">Loans (₦2,500)</span>
                                </div>
                                <div className="flex items-center gap-2 ml-auto">
                                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                    <span className="text-gray-500">Remaining (₦4,500)</span>
                                </div>
                            </div>
                        </div>

                        {/* Transactions Table */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold">Recent Transactions</h3>
                                <button className="text-red-600 text-xs font-bold hover:text-red-700">View All</button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] text-gray-500 uppercase border-b border-gray-200">
                                            <th className="pb-3 pl-2 font-bold">Date</th>
                                            <th className="pb-3 font-bold">Description</th>
                                            <th className="pb-3 font-bold">Status</th>
                                            <th className="pb-3 pr-2 text-right font-bold">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {transactions.map(tx => (
                                            <tr key={tx.id} className="group hover:bg-gray-50 transition-colors">
                                                <td className="py-4 pl-2 text-gray-500 text-xs">{tx.date}</td>
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                                                            <tx.icon size={14} />
                                                        </div>
                                                        <span className="font-medium text-gray-900">{tx.description}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${tx.status === 'Processed' || tx.status === 'Paid'
                                                        ? 'bg-green-100 text-green-700 border-green-200'
                                                        : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                        }`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 pr-2 text-right font-medium">₦{tx.amount.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Actions & Breakdown) */}
                    <div className="space-y-8">

                        {/* Quick Actions */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <h3 className="font-bold text-sm mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <ActionButton icon={CreditCard} label="Payment Methods" color="red" />
                                <ActionButton icon={PieChart} label="Payment Plan" color="gray" />
                                <ActionButton icon={FileText} label="Tax Forms" color="emerald" />
                                <ActionButton icon={Building2} label="Direct Deposit" color="orange" />
                            </div>
                        </div>

                        {/* Cost Breakdown */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <h3 className="font-bold text-sm mb-6">Cost Breakdown</h3>
                            <div className="space-y-5">
                                {costBreakdown.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <item.icon size={16} className="text-gray-500" />
                                            <span className="text-sm text-gray-700">{item.label}</span>
                                        </div>
                                        <span className="text-sm font-bold">₦{item.amount.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-xs text-gray-500 font-medium">Total Billed</span>
                                <span className="text-sm font-bold text-gray-900">₦13,950.00</span>
                            </div>
                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}

// Helpers
function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-red-700 text-white shadow-lg shadow-red-900/20' : 'text-gray-600 hover:text-gray-900'}`}>
            {icon}
            {label}
        </a>
    )
}

function ActionButton({ icon: Icon, label, color }: { icon: React.ElementType, label: string, color: string }) {
    const colorClasses: Record<string, string> = {
        red: 'bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white',
        gray: 'bg-gray-100 text-gray-700 group-hover:bg-gray-600 group-hover:text-white',
        emerald: 'bg-green-100 text-green-700 group-hover:bg-green-600 group-hover:text-white',
        orange: 'bg-orange-100 text-orange-700 group-hover:bg-orange-600 group-hover:text-white',
    }

    return (
        <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${colorClasses[color]}`}>
                <Icon size={18} />
            </div>
            <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
        </button>
    )
}
