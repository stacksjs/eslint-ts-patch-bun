import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import fs from 'fs-extra'
import { execa } from 'execa'

describe('basic', () => {
  const fixture = fileURLToPath(new URL('./fixtures/basic', import.meta.url))
  const temp = fileURLToPath(new URL('../../.temp-eslint-ts-patch-bun', import.meta.url))

  beforeEach(async () => {
    await fs.rm(temp, { recursive: true, force: true })
    await fs.mkdirp(dirname(temp))
    await fs.copy(fixture, temp)
  })

  afterEach(async () => {
    await fs.rm(temp, { recursive: true, force: true })
  })

  const packageManagers = ['bun']
  for (const pm of packageManagers) {
    it(
      pm,
      async () => {
        if (pm !== 'pnpm')
          await fs.rm(`${temp}/bun.lockb`)

        await execa(pm, ['install'], { cwd: temp, stdio: 'pipe' })
        const process = await execa(pm, ['run', 'lint'], {
          cwd: temp,
          stdio: 'pipe',
          env: {
            DEBUG: 'eslint-ts-patch-bun',
          },
        })
        expect(process.stderr)
          .toContain('eslint-ts-patch-bun initialized')
        expect(process.stdout)
          .toContain('Hello from eslint.config.ts')
      },
      30_000,
    )
  }
})
