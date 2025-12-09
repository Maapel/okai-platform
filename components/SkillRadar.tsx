'use client';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const data = [
    { subject: 'Velocity', A: 120, fullMark: 150 },
    { subject: 'Resilience', A: 98, fullMark: 150 },
    { subject: 'Security', A: 86, fullMark: 150 },
    { subject: 'Testing', A: 99, fullMark: 150 },
    { subject: 'Architecture', A: 85, fullMark: 150 },
];

export default function SkillRadar() {
    return (
        <div className="h-[300px] w-full -ml-6">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#3f3f46" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="#10b981"
                        fillOpacity={0.2}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
