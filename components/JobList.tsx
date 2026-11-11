
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { HimalayasJob } from "@/types/job";

export default function JobList() {
    const [jobs, setJobs] = useState<HimalayasJob[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [departments, setDepartments] = useState<string[]>([]);
    const [selectDepart, setSelectDepart] = useState("all");

    const fetchJobs = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch("/api/jobs");

            if (!response.ok) {
                throw new Error("Failed to fetch jobs");
            }

            const data = await response.json();

            setJobs(data.jobs);
            setNextCursor(data.nextCursor);

            // Mengambil seluruh kategori dari setiap pekerjaan
            const categories: string[] = data.jobs.flatMap(
                (job: HimalayasJob) => job.parentCategories
            );

            // Menghilangkan kategori yang duplikat
            const uniqueCategories: string[] = Array.from(
                new Set<string>(categories)
            );

            setDepartments(uniqueCategories);

        } catch (error) {
            console.error("Error fetching jobs:", error);
            setError("Gagal mengambil data pekerjaan.");

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Filter pekerjaan berdasarkan department
    const filteredJob =
        selectDepart === "all"
            ? jobs
            : jobs.filter((job) =>
                job.parentCategories.includes(selectDepart)
            );

    // Loading State
    if (isLoading) {
        return (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                <p className="text-sm font-medium text-gray-500">
                    Loading available jobs...
                </p>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
                <div className="rounded-full bg-red-100 p-3">
                    <span className="text-2xl">!</span>
                </div>

                <p className="font-medium text-red-700">
                    {error}
                </p>

                <button
                    onClick={fetchJobs}
                    className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Career Opportunities
                    </p>

                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Explore Latest Jobs
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Discover opportunities that match your career goals.
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-xs font-medium text-gray-500">
                        Available Jobs
                    </p>

                    <p className="text-2xl font-bold text-gray-900">
                        {filteredJob.length}
                    </p>
                </div>

            </div>

            {/* Department Filter */}
            <div className="mb-6">
                <label
                    htmlFor="department"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Filter by Department
                </label>

                <select
                    id="department"
                    value={selectDepart}
                    onChange={(e) => setSelectDepart(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 sm:w-64"
                >
                    <option value="all">
                        All Departments
                    </option>

                    {departments.map((department) => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
            </div>

            {/* Empty State */}
            {filteredJob.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                        No jobs found
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        There are currently no available job opportunities.
                    </p>
                </div>
            ) : (

                /* Job Grid */
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {filteredJob.map((job) => (
                        <div
                            key={job.guid}
                            className="group flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                        >

                            {/* Company Icon */}
                            <div className="mb-5 flex items-center justify-between">

                                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
                                    <img
                                        src={job.companyLogo}
                                        alt={`${job.companyName} logo`}
                                        width={48}
                                        height={48}
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                    Open Position
                                </span>

                            </div>

                            {/* Job Information */}
                            <div className="flex-1">

                                <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition group-hover:text-blue-600">
                                    {job.title}
                                </h3>

                                <p className="mb-4 line-clamp-1 text-sm font-medium text-gray-500">
                                    {job.companyName || "Company not specified"}
                                </p>

                                {/* Categories */}
                                <div className="mb-5 flex flex-wrap gap-2">

                                    {job.parentCategories.map((category) => (
                                        <span
                                            key={category}
                                            className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                        >
                                            {category}
                                        </span>
                                    ))}

                                    {job.seniority.map((level) => (
                                        <span
                                            key={level}
                                            className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600"
                                        >
                                            {level}
                                        </span>
                                    ))}

                                </div>

                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray-100 pt-4">

                                <Link
                                    href={job.applicationLink}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                                >
                                    View Details

                                    <span className="transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </section>
    );
}
